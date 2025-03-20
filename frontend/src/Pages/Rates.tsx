import  {useGetSecureRatesQuery } from '../features/Rates'

export default function ExchangeRates() {
    const rates = {
      AED: 3.673005,
      AFN: 70.925887,
      ALL: 91.006196,
      // ... (use the rest of your rates data here)
      ZWL: 322,
    };
  

    const {data , isError ,isLoading} =  useGetSecureRatesQuery()

    if(isLoading){
      return <p>Loading...</p>
    }

    console.log(data)

    if(isError){
        return (
            <div className="w-full h-screen  flex items-center justify-center p-4">
              <div className=" bg-gray-100 rounded-xl shadow-lg w-full max-w-md h-full max-h-[600px] overflow-y-auto p-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Exchange Rates (Base: USD)
                </h2>
                <ul className="space-y-2">
                  {Object.entries(rates).map(([currency, rate]) => (
                    <li
                      key={currency}
                      className="flex justify-between items-center border-b border-gray-200 pb-2"
                    >
                      <span className="font-medium text-gray-800">{currency}</span>
                      <span className="text-sm text-gray-600">{rate.toFixed(4)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        
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
  