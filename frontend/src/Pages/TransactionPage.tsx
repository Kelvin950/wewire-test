import { toast } from "react-toastify";
import Transactions from "../components/Transaction";
import { useGetSecureTransactionQuery  } from "../features/TransactionApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorType } from "../types";
function TransactionPage(){
    const { data, isLoading, error } = useGetSecureTransactionQuery(undefined,{
      refetchOnMountOrArgChange:true
    });
  const navigate=  useNavigate()
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
        return;
      }
    
     }
      toast.error("Failed. Try again")
       
    }
 return (
   <div className="p-6">
     <h2 className="text-xl font-bold mb-4 text-white">Transaction History</h2>
     {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
     <ul className="space-y-2">
       {data?.map((txs) => (
         <li 
         key={txs.id}
         className="border p-2 rounded flex justify-between items-center">
           <Transactions
           
             fromCurrency={txs.fromCurrency}
             toCurrency={txs.toCurrency}
             amount={txs.amount}
            
             id={txs.id}
             rate={txs.rate}
             result={+txs.result.toFixed(3)}
             createdAt={txs.createdAt}
           />
         </li>
       ))}
     </ul>
   </div>
 );
}

export default TransactionPage