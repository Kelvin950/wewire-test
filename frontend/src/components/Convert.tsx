import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { ConvertSchema, formData } from "../types";
import { currencyCodes } from "../constant";
import { useConvertMutation , useLazyGetNonceQuery } from "../features/ConvertApi";
import { useState } from "react";

export default function Convert(){
 const {
     register,
     handleSubmit,
     formState: { errors },
     
   } = useForm<formData>({
     resolver:zodResolver(ConvertSchema)
   });
 
   const [convert , {isLoading,isError}]  = useConvertMutation()
   const  [result,setResult] =useState<number>()
    const [triggerNonce , {isLoading:isNonceLoading ,isError:isNonceError}]  =  useLazyGetNonceQuery()
  const onSubmit = async (data:formData) => {
    console.log("SUCCESS", data);
 
    if(isNonceLoading){
      console.log("loading")
    }

    if(isNonceError){
      return 
    }


    triggerNonce()

   const  {data:resData , error} =  await  convert({
      to: data.currency! , 
      from:data.baseCurrency! , 
      amount:data.amount!
     })

     if(isLoading){
       console.log(isLoading) 
     }
     if(isError){
      console.log(isError)
     }
     
     if(error){
      console.log(error)
     }
   

     setResult(resData?.result)

     
  };
    return (
      <>
        <div className="f">
          <div>
            {result}
          </div>
          <div className="flex items-center justify-center p-5 mb-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-sm mx-auto mt-20 space-y-4"
            >
              <select
                id="currency"
                {...register("baseCurrency")}
                defaultValue="ghs"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Base currency --</option>
                <option value="usd">USD</option>
                
              </select>
              <select
                id="currency"
                {...register("currency")}
                defaultValue="usd"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose currency --</option>
                {currencyCodes.map(c=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <FormField
                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="amount"
                name="amount"
                register={register}
                valueAsNumber={true}
                error={errors.amount}
              />

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Convert
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <img
              width={200}
              src="https://cdn.sender.net/email_images/255731/images/all/wewire_logo_v2.png"
              alt="WeWire Logo"
              className=" h-auto object-contain"
            />
          </div>
        </div>
      </>
    );
}