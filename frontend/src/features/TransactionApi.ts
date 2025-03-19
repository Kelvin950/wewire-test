// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com/" }),
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "transactions",
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
