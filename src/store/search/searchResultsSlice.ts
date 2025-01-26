import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Media } from "../../types/mediaTypes";

type SearchResultsState = {
  searchQuery: string;
  movies: Media[];
  isLoading: boolean;
  error: string | null;
};

const initialState: SearchResultsState = {
  searchQuery: "",
  movies: [],
  isLoading: false,
  error: null,
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setMovies(state, action: PayloadAction<Media[]>) {
      state.movies = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    resetSearch: () => initialState,
  },
});

export const { setSearchQuery, setMovies, setLoading, resetSearch, setError } = searchResultsSlice.actions;
export const selectAllResults = (state:{searchResults:SearchResultsState})=>state.searchResults;
export default searchResultsSlice.reducer;
