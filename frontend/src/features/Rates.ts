// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rates } from "../types";

export const RatesApi = createApi({
  reducerPath: "RatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" , prepareHeaders:(headers)=>{
  
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
    
  }  , credentials:"include"}),
  
  endpoints: (builder) => ({
    getRates: builder.query<Rates, void>({
      query: () => "exchange-rates",
    }),
    getNonce: builder.query<{ message: string }, void>({
      query: () => "nonce",
    }),
    getSecureRates: builder.query<Rates ,void>({
     async queryFn(_, __, ___, baseQuery) {
        const nonce = await baseQuery("nonce");
        if (nonce.error) {
          return { error: nonce.error };
        }

       const rates = await baseQuery("exchange-rates");

    if (rates.error) return { error: rates.error };

    console.log(rates)
    return { data: rates.data as Rates };
        
      },
    })
  }),
});

export const { useGetRatesQuery  ,useGetSecureRatesQuery} = RatesApi;
