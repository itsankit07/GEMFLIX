import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../../types/mediaTypes";

type ShowsState = {
  airToday: Media[];
  popular: Media[];
  topRated: Media[];
  hindiShows: Media[];
};
const initialState: ShowsState = {
  airToday: [],
  popular: [],
  topRated: [],
  hindiShows: [],
};

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setAirToday(state, action: PayloadAction<Media[]>) {
      state.airToday = action.payload;
    },
    setTVPopular(state, action: PayloadAction<Media[]>) {
      state.popular = action.payload;
    },
    setTVTopRated(state, action: PayloadAction<Media[]>) {
      state.topRated = action.payload;
    },
    setHindiShows(state, action: PayloadAction<Media[]>) {
      state.hindiShows = action.payload;
    },
  },
});

export const { setAirToday, setTVPopular, setTVTopRated, setHindiShows } = showsSlice.actions;
export const setAllShows = (state: { shows: ShowsState }) => state.shows;
export default showsSlice.reducer;
