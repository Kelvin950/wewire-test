// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" , prepareHeaders:(headers)=>{
  
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
    
  } }),
  
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "user/transactions",
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
