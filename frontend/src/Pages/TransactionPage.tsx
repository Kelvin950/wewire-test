import Transactions from "../components/Transaction";
import { useGetTransactionsQuery } from "../features/TransactionApi";

function TransactionPage(){
    const { data, isLoading, error } = useGetTransactionsQuery();
console.log(data)
    if(isLoading){
         return (
           <div className="p-6">
             <h2 className="text-xl font-bold mb-4">Transaction History</h2>
             {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
             <ul className="space-y-2">
               <Transactions
                 fromCurrency="GHS"
                 toCurrency="USD"
                 amount={10}
                 createdAt=""
                 id={1}
                 rate={12}
                 convertedAmount={100}
               />
             </ul>
           </div>
         );
    }

    if(error){
         return (
           <div className="p-6">
             <h2 className="text-xl font-bold mb-4">Transaction History</h2>
             {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
             <ul className="space-y-2">
               <Transactions
                 fromCurrency="GHS"
                 toCurrency="USD"
                 amount={10}
                 createdAt="12"
                 id={1}
                 rate={12}
                 convertedAmount={100}
               />
             </ul>
           </div>
         );
    }
 return (
   <div className="p-6">
     <h2 className="text-xl font-bold mb-4">Transaction History</h2>
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
             createdAt={txs.createdAt}
             id={txs.id}
             rate={txs.rate}
             convertedAmount={txs.convertedAmount}
           />
         </li>
       ))}
     </ul>
   </div>
 );
}

export default TransactionPage