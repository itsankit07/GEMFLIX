import { configureStore } from "@reduxjs/toolkit";

import searchResultsSliceReducer from "./search/searchResultsSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchResults: searchResultsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
