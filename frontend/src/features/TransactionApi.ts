// src/features/transactions/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.VITE_BASE_URL  , prepareHeaders:(headers)=>{
  
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
    
  } , credentials:"include" }),
  
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "user/transactions",
    }),
    getNonce: builder.query<{ message: string }, void>({
      query: () => "nonce",
    }),
    
    getSecureTransaction:builder.query<Transaction[] ,void>({
         async queryFn(_, __, ___, baseQuery) {
            const nonce = await baseQuery("nonce");
            if (nonce.error) {
              return { error: nonce.error };
            }
    
           const txn = await baseQuery("user/transactions");
    
        if (txn.error) return { error: txn.error };
    
        
        return { data: txn.data as Transaction[] };
            
          },
        })

  }),
});

export const { useGetTransactionsQuery ,useGetNonceQuery,useGetSecureTransactionQuery} = transactionApi;
