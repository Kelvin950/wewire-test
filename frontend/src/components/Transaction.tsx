
interface  TransactinProps{

    id:string 
    currency:string 
    amount:string
    date:string 
    baseCurrency:string
}

function Transaction(props:TransactinProps){

    return (
      <>
        <li
          key={props.id}
          className="border p-2 rounded flex justify-between items-center"
        >
          <span>{props.currency}</span>
          <span>{props.baseCurrency}</span>
          <span>{props.amount}</span>
          <span>{new Date(props.date).toLocaleDateString()}</span>
        </li>
      </>
    );
}

export default Transaction