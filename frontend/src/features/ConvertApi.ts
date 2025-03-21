// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorType, Transaction, convertRequest } from "../types";

export const convertApi = createApi({
  reducerPath: "convertApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL  ,credentials:"include" ,prepareHeaders:(headers)=>{
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
  } }),
  endpoints: (builder) => ({
  
    convert: builder.mutation<Transaction, convertRequest>({
      query: (credentials) => ({
        url: "convert",
        method: "POST",
        body: credentials,
      
      }),
      transformErrorResponse:(error)=>{
        return error.data as ErrorType;
      }
      
    }),
    getNonce: builder.query<{ message: string }, void>({
      query: () => "nonce",
    }),
    
  }),
});

export const { useConvertMutation ,useLazyGetNonceQuery } = convertApi;
