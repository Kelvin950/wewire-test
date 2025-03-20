import { Transaction as TransactionProp } from "../types";

function Transaction(props: TransactionProp) {
  const labels: Record<string, string> = {
    fromCurrency: "From",
    toCurrency: "To",
    amount: "Amount",
    rate: "Exchange Rate",
    result: "Converted Amount",
    createdAt: "Date",
  };

  return (
    <>
      {Object.entries(props).map(([key, value]) => {
      if (key === "id") return null;

      const displayValue =
        key === "createdAt"
          ? new Date(value as string).toLocaleDateString()
          : value;

      return (
        <span key={key} className="font-medium text-white">
          {labels[key]}: {typeof displayValue == "number" ? displayValue.toFixed(2) :displayValue}
        </span>
      );
      })}
    </>
  );
}

export default Transaction;