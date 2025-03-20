import Transactions from "../components/Transaction";
import { useGetSecureTransactionQuery  } from "../features/TransactionApi";

function TransactionPage(){
    const { data, isLoading, error } = useGetSecureTransactionQuery();
    console.log(data)
console.log(data)
    if(isLoading){
         return (
           <div className="p-6">
             <h2 className="text-xl font-bold text-white mb-4">Transaction History</h2>
             {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
             <ul className="space-y-2">
             <li className="border p-2 rounded flex justify-between items-center">

               <Transactions
                 fromCurrency="GHS"
                 toCurrency="USD"
                 amount={10}
                 createdAt=""
                 id={1}
                 rate={12}
                 result={100}
               />
               </li>
             </ul>
           </div>
         );
    }

    if(error){
         return (
           <div className="p-6">
             <h2 className="text-xl font-bold mb-4 text-white">Transaction History</h2>
             {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
             <ul className="space-y-2">
              <li className="border p-2 rounded flex justify-between items-center">

            
               <Transactions
                 fromCurrency="GHS"
                 toCurrency="USD"
                 amount={10}
                 createdAt="12"
                 id={1}
                 rate={12}
                 result={100}
                 
               />
                 </li>
                 
             </ul>
           </div>
         );
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