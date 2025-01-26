import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { resetSearch, setError, setLoading, setMovies, setSearchQuery } from "../store/search/searchResultsSlice";
import { RequestOptions } from "../types/api";
import { Media, PromiseResponse } from "../types/mediaTypes";
import { model } from "../utils/openAI";
import { MEDIA_ENDPOINTS } from "../types/mediaEndpoints";

export const useSearchResults = () => {
  const dispatch = useDispatch();

  const getMoviesbyquery = async (movie: string) => {
    try {
      const url = `${MEDIA_ENDPOINTS.movie.search}?query=${encodeURIComponent(movie.trim())}`;
      const response = await fetch(url, RequestOptions());
      if (!response.ok) {
        throw new Error(`Failed to fetch movie data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch movie : ${movie} : ${(error as Error).message}`);
    }
  };

  const fetchMovieVideo = async (movieId: number) => {
    try {
      const response = await fetch(MEDIA_ENDPOINTS.movie.videos(movieId), RequestOptions());
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch movie videos: ${movieId} :${(error as Error).message}`);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const prompt = `You are a highly advanced movie recommendation system. 
                  Based on the user's query:${searchQuery}, provide exactly 
                  5 or less than 5 movie recommendations that match the query. The response must only 
                  include the movie titles,separated by a,without any additional text
                  or explanations e.g Stree,Agnipath,Welcome,Hungama,Maine Pyar Kiya. 
                  If no suitable recommendations are found, just return "-1".`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      if (responseText.includes("-1")) {
        dispatch(setSearchQuery(searchQuery));
        dispatch(setError("No response found from AI"));
        dispatch(setLoading(false));
        dispatch(setMovies([]));
        return;
      }

      const movieTitles = responseText.split(",").filter((title) => title.trim());

      const movieDetailsPromises = movieTitles.map((movie) => getMoviesbyquery(movie));
      const movieDetails = await Promise.all(movieDetailsPromises);
      const allMovieDetails: Media[] = movieDetails.map((movie) => movie.results[0]).flat();

      if (!allMovieDetails.length) {
        dispatch(setLoading(false));
        dispatch(setMovies([]));
        return;
      }

      const videoPromise = allMovieDetails.map((movie) => fetchMovieVideo(movie?.id));
      const videoDetails: PromiseResponse[] = await Promise.allSettled(videoPromise);
      const moviesWithVideos = allMovieDetails.map((movie, index) => {
        const currentResult = videoDetails[index];
        const videos = currentResult.status === "fulfilled" && currentResult.value ? currentResult.value.results : [];
        const trailer = videos?.find((movie) => movie?.type == "Trailer") || videos[0];
        return {
          ...movie,
          trailer_key: trailer?.key,
        };
      });

      dispatch(setSearchQuery(searchQuery));
      dispatch(setMovies(moviesWithVideos));
      dispatch(setLoading(false));
      dispatch(setError(""));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError((error as Error).message) || "An error occurred while searching for movies. Please try again");
      dispatch(setMovies([]));
    }
  };

  const reset = useCallback(() => {
    dispatch(resetSearch());
  }, [dispatch]);

  return { handleSearch, reset };
};
