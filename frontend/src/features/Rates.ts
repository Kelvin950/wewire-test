// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../types";

export const RatesApi = createApi({
  reducerPath: "RatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" , prepareHeaders:(headers)=>{
  
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
    
  } }),
  
  endpoints: (builder) => ({
    getRates: builder.query<Transaction[], void>({
      query: () => "exchange-rates",
    }),
  }),
});

export const { useGetRatesQuery } = RatesApi;
