import { toast } from 'react-toastify';
import { useEffect } from 'react';
import  {useGetSecureRatesQuery } from '../features/Rates'
import { useNavigate } from "react-router-dom";
import { ErrorType } from '../types';

export default function ExchangeRates() {
  
  

    const {data , error ,isLoading} =  useGetSecureRatesQuery()
     const navigate= useNavigate()
      useEffect(() => {
        if (isLoading) {
          if (!toast.isActive("loadingToast")) {
            toast.info("Please Wait", { toastId: "loadingToast" });
          }
        }else{
          toast.dismiss()
        }
      }, [isLoading]);
      
    

    if(error){


      if("data" in error){
            const err =  error.data as ErrorType
            const unAuthorizedError = (
              err.statusCode === 401 && !err.message?.includes("nonce")
            );
            if (unAuthorizedError) {
              localStorage.removeItem("token");
              navigate("/login");
              
            }
          
           }
      toast.error("Failed. Try again")
        
        
    }


 
     return <>
     
     <div className="w-full h-screen  flex items-center justify-center p-4">
              <div className=" bg-gray-100 rounded-xl shadow-lg w-full max-w-md h-full max-h-[600px] overflow-y-auto p-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Exchange Rates (Base: USD)
                </h2>
                <ul className="space-y-2">
      {
        data && Object.entries((data.rates)).map(([currency, rate]) => (
            <li
            key={currency}
            className="flex justify-between items-center border-b border-gray-200 pb-2"
          >
            <span className="font-medium text-gray-800">{currency}</span>
            <span className="text-sm text-gray-600">{rate.toFixed(4)}</span>
          </li>
            ))
      }
        </ul>
              </div>
            </div>
     </>
  }
  