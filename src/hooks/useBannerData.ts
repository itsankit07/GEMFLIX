import { useEffect, useState } from "react";

import { RequestOptions } from "../types/api";
import { Media, MediaResults, Video, VideosResults } from "../types/mediaTypes";
import { MEDIA_ENDPOINTS } from "../types/mediaEndpoints";

type BannerData = {
  movie: Media | null;
  video: Video | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: BannerData = {
  movie: null,
  video: null,
  error: null,
  isLoading: true,
};

export const useBannerData = (apiURL: string) => {
  const [bannerData, setBannerData] = useState<BannerData>(initialState);

  useEffect(() => {
    let isMounted = true;

    const fetchBanner = async () => {
      if (isMounted) {
        setBannerData({ ...initialState });
      }

      if (!apiURL && typeof apiURL !== "string") {
        setBannerData((prev) => ({
          ...prev,
          error: `Invalid API URL Provied : ${apiURL} `,
          isLoading: false,
        }));
        return;
      }

      const isTV = apiURL.toLowerCase().includes("tv");

      try {
        const moviesResponse = await fetch(apiURL, RequestOptions());
        if (!moviesResponse.ok) {
          throw new Error(`Failed to fetch content: ${moviesResponse.status} ${moviesResponse.statusText}`);
        }

        const movieData: MediaResults = await moviesResponse.json();
        if (!movieData?.results?.length) {
          throw new Error("Content Not Availabe");
        }

        const heroMovie = movieData?.results[0];

        if (!heroMovie?.id) {
          throw new Error("Invalid content data received");
        }

        const endpoint = isTV ? MEDIA_ENDPOINTS.tv.videos(heroMovie?.id) : MEDIA_ENDPOINTS.movie.videos(heroMovie?.id);

        const videosResponse = await fetch(endpoint, RequestOptions());
        if (!videosResponse.ok) {
          throw new Error(`Failed to fetch videos: ${videosResponse.status} ${videosResponse.statusText}`);
        }

        const videosData: VideosResults = await videosResponse.json();

        const movieVideos = videosData?.results?.filter((movie) => movie?.type.toLowerCase() == "trailer");

        const heroMovieVideo = movieVideos?.[0] ?? videosData?.results?.[0] ?? null;

        if (isMounted) {
          setBannerData({
            movie: heroMovie,
            video: heroMovieVideo,
            error: null,
            isLoading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : "An unexpected error occured";
          console.error(`useBannerData Error : ${errorMessage}`);
          setBannerData((prev) => ({
            ...prev,
            error: errorMessage,
            isLoading: false,
          }));
        }
      }
    };
    fetchBanner();

    return () => {
      isMounted = false;
    };
  }, [apiURL]);

  return bannerData;
};
