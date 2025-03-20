// src/app/store.ts
//@ts-ignore
import { configureStore ,Tuple} from "@reduxjs/toolkit";
import { authApi } from "../features/Authapi";
import { transactionApi } from "../features/TransactionApi";
import authReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
