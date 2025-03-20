import Convert from "../components/Convert";


export default function ConvertPage(){

    return (
      <div className="p-6">
        <h2 className="text-xl text-white font-bold mb-4">Convert Currency</h2>
        {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading transactions</p>} */}
       <Convert/>
      </div>
    );
}