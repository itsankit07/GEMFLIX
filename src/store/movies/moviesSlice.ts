import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../../types/mediaTypes";

type MediaState = {
  nowPlaying: Media[];
  upcoming: Media[];
  topRated: Media[];
  bollywood: Media[];
  animation: Media[];
}; 

const initialState: MediaState = {
  nowPlaying: [],
  upcoming: [],
  topRated: [],
  bollywood: [],
  animation: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setNowPlaying(state, action: PayloadAction<Media[]>) {
      state.nowPlaying = action.payload;
    },
    setUpcoming(state, action: PayloadAction<Media[]>) {
      state.upcoming = action.payload;
    },
    setTopRated(state, action: PayloadAction<Media[]>) {
      state.topRated = action.payload;
    },
    setBollywood(state, action: PayloadAction<Media[]>) {
      state.bollywood = action.payload;
    },
    setAnimation(state, action: PayloadAction<Media[]>) {
      state.animation = action.payload;
    },
    resetMovies() {
      return initialState;
    },
  },
});

export const { setNowPlaying, setUpcoming, setTopRated, setBollywood, setAnimation, resetMovies } = moviesSlice.actions;

export const selectAllMovies = (state: { movies: MediaState }) => state.movies;

export default moviesSlice.reducer;
