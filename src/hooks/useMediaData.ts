import { useEffect, useState } from "react";

import { RequestOptions } from "../types/api";
import { Media, MediaResults, PromiseResponse } from "../types/mediaTypes";
import { MEDIA_ENDPOINTS } from "../types/mediaEndpoints";

type MediaData = {
  media: Media[];
  error: string | null;
  isLoading: boolean;
};

const initialState: MediaData = {
  media: [],
  error: null,
  isLoading: true,
};

export const useMediaData = (apiURL: string) => {
  const [mediaData, setMediaData] = useState<MediaData>(initialState);

  const isTV = apiURL?.toLowerCase().includes("tv") ?? false;

  const fetchMedia = async () => {
    const response = await fetch(apiURL, RequestOptions());
    if (!response.ok) {
      throw new Error(`Failed to fetch media list: ${response.status} ${response.statusText}`);
    }
    const data: MediaResults = await response.json();
    if (!data?.results?.length) {
      throw new Error("No media results found");
    }
    return data?.results;
  };

  const fetchMediaVideo = async (id: number) => {
    if (!id) {
      throw new Error("Media ID is required for fetching videos");
    }
    const endpoint = isTV ? MEDIA_ENDPOINTS.tv.videos(id) : MEDIA_ENDPOINTS.movie.videos(id);
    const response = await fetch(endpoint, RequestOptions());
    if (!response.ok) {
      throw new Error(`Failed to fetch media videos: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("No video data received");
    }
    return data;
  };

  useEffect(() => {
    let isMounted = true;

    const getAllData = async () => {
      if (isMounted) {
        setMediaData({ ...initialState });
      }

      if (!apiURL && typeof apiURL !== "string") {
        setMediaData((prev) => ({
          ...prev,
          error: `Invalid API URL Provied : ${apiURL} `,
          isLoading: false,
        }));
        return;
      }

      try {
        const media = await fetchMedia();
        const videoPromises = media.map((mediaItem) => {
          if (!mediaItem?.id) {
            return Promise.reject(new Error(`Invalid media ID for item: ${JSON.stringify(mediaItem)}`));
          }
          return fetchMediaVideo(mediaItem.id);
        });
        const videoDetails: PromiseResponse[] = await Promise.allSettled(videoPromises);

        const mediaWithVideos: Media[] = media.map((mediaItem, index) => {
          const currentVideo = videoDetails[index];
          if (currentVideo.status === "rejected") {
            console.warn(`Failed to fetch video for media ${mediaItem.id}:`);
            return {
              ...mediaItem,
              trailer_key: null,
            };
          }
          const videos = currentVideo.value?.results || [];
          const trailer = videos?.find((video) => video?.type?.toLowerCase() == "trailer") || videos[0];

          return {
            ...mediaItem,
            trailer_key: trailer?.key,
          };
        });
        if (isMounted) {
          setMediaData({
            media: mediaWithVideos,
            error: null,
            isLoading: false,
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occured";
        console.error(`useMediaData Error : ${errorMessage}`);
        setMediaData((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      }
    };
    getAllData();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiURL]);

  return mediaData;
};
