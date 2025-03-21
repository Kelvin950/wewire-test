// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nonceApi = createApi({
  reducerPath: "nonceApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL , prepareHeaders:(headers)=>{
  
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
    
  } }),
  
  endpoints: (builder) => ({
    getNonce: builder.query({
      query: () => "nonce",
    }),
  }),
});

export const { useGetNonceQuery } = nonceApi;
