// src/app/store.ts
//@ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/Authapi";
import { transactionApi } from "../features/TransactionApi";
import authReducer from "./AuthSlice";
import { RatesApi } from "../features/Rates";
import { nonceApi } from "../features/nonceApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [RatesApi.reducerPath]: RatesApi.reducer,
  },
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      RatesApi.middleware ,
      nonceApi.middleware,
      transactionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
