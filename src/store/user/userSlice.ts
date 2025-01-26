// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { uid: string; email: string | null; displayName: string | null } | null;
  tempData?: string | null;
}

const initialState: UserState = {
  user: null,
  tempData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ uid: string; email: string | null; displayName: string | null }>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
