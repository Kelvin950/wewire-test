// src/app/store.ts
import { configureStore ,Tuple} from "@reduxjs/toolkit";
import { authApi } from "../features/Authapi";
import { transactionApi } from "../features/TransactionApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: () =>
    () => new Tuple(  authApi.middleware,
      transactionApi.middleware)
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
