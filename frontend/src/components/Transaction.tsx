import { Transaction  as TransactionProp} from "../types";


function Transaction(props:TransactionProp){

    return (
      <>
      
          <span>{props.toCurrency}</span>
          <span>{props.fromCurrency}</span>
          <span>{props.amount}</span>
          <span>{props.rate}</span>
          <span>{props.convertedAmount}</span>

          <span>{new Date(props.createdAt).toLocaleDateString()}</span>
    
      </>
    );
}

export default Transaction