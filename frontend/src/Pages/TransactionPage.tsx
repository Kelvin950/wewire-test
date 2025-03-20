import Transactions from "../components/Transaction";


function TransactionPage(){
 return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
      <ul className="space-y-2">
        <Transactions currency="GHS" baseCurrency="USD" amount="10" date="12" id="1"/>
      </ul>
    </div>
 )
}

export default TransactionPage