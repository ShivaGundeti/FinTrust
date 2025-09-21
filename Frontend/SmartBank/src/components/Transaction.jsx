import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Transaction = () => {
    const [Transactions, setTransactions] = useState([])
    async function getNewdetails(){
      
     try {
      const response = await axios.get("http://localhost:3000/auth/getUser", { withCredentials: true });
    const fetched = response.data?.userdata?.transactions || [];

    setTransactions(prev => {

      const unique = fetched.filter(
        tx => !prev.some(p => p._id === tx._id)
      );

      return [...unique, ...prev];
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
    }
    function getDate(transactiondate){
        const date = new Date(transactiondate);

const options = { month: 'short', day: 'numeric' };
let formatted = date.toLocaleString('en-US', options);

// Add "st", "nd", "rd", "th"
const day = date.getDate();
const suffix =
  day % 10 === 1 && day !== 11 ? 'st' :
  day % 10 === 2 && day !== 12 ? 'nd' :
  day % 10 === 3 && day !== 13 ? 'rd' : 'th';

formatted = formatted.replace(/\d+/, day + suffix);


return formatted;

    }
    useEffect(()=>{
        getNewdetails()
    },[])
  return (
    <div className={`w-72 sm:w-96 bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200 h-60  overflow-x-auto no-scrollbar`}>
      <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800">Transaction History</h2>
      <table className="w-full text-left border-collapse ">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 md:py-3 px-3 md:px-4 text-gray-600 font-medium">Date</th>
            <th className="py-2 md:py-3 px-3 md:px-4 text-gray-600 font-medium">Type</th>
         
            <th className="py-2 md:py-3 px-3 md:px-4 text-gray-600 font-medium text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {Transactions.map(({ amount, date,type }) => (
            <tr
              key={Math.random()}
              className="hover:bg-gray-100 transition cursor-pointer"
            >
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-700">{getDate(date)}</td>
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-700">{type}</td>
              {/* <td className="py-2 md:py-3 px-3 md:px-4 text-gray-900">{description}</td> */}
              <td
                className={`py-2 md:py-3 px-3 md:px-4 text-right font-semibold ${
                  type == "sent" ? "text-red-600" : "text-green-600"
                }`}
              >
                { type == "sent" ? "-₹" : "+₹"}
                {Math.abs(amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transaction