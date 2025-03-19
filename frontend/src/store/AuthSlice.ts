// src/features/auth/authSlice.ts
//@ts-ignore
import { createSlice  } from "@reduxjs/toolkit";
import { User } from "../types";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state:AuthState, {payload}: { payload: User }) => {
      state.user = payload;
    },
    logout: (state:AuthState) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
