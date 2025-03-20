import { Transaction  as TransactionProp} from "../types";


function Transaction(props:TransactionProp){

    return (
      <>
      
      <span className="font-medium">From : {props.fromCurrency}</span>
  

  <span className="font-medium">To : {props.toCurrency}</span>


  <span className="font-medium">Amount : {props.amount}</span>
  

  <span className="font-medium">Exchange Rate : {props.rate}</span>
  

  <span className="font-medium">Converted Amount : {props.result}</span>
  

          <span>{new Date(props.createdAt).toLocaleDateString()}</span>
    
      </>
    );
}

export default Transaction