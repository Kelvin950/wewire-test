// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction, convertRequest } from "../types";

export const convertApi = createApi({
  reducerPath: "convertApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/"  ,credentials:"include"}),
  endpoints: (builder) => ({
  
    convert: builder.mutation<Transaction, convertRequest>({
      query: (credentials) => ({
        url: "convert",
        method: "POST",
        body: credentials,
      }),
    }),
    getNonce: builder.query<{ message: string }, void>({
      query: () => "nonce",
    }),
    
  }),
});

export const { useConvertMutation ,useLazyGetNonceQuery } = convertApi;
