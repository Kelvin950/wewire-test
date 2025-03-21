// src/features/auth/authSlice.ts
//@ts-ignore
import { createSlice  } from "@reduxjs/toolkit";
import { AutData } from "../types";

interface AuthState {
  user: AutData | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state:AuthState, {payload}: { payload: AutData }) => {

        
      state.user = payload;
      localStorage.setItem("token", payload.token)
    },
    logout: (state:AuthState) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
