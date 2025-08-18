import React, { useEffect, useState } from 'react'
import Aisidebar from "../components/Aisidebar"
import Navbar from '../components/Navbar'
import Transaction from '../components/Transaction'
import axios from 'axios'

const Transactionpage = () => {
    const [Transactions, setTransactions] = useState([])
    async function getNewdetails(){
      
     try {
      const response = await axios.get("https://fintrust-backend.onrender.com/auth/getUser", { withCredentials: true });
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
    <div>
        <Navbar/>
        <div className='flex flex-wrap'>
        <Aisidebar/>
            <div className='p-4'>
      <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800">Transaction History</h2>
                <div className={`sm:mt-3 w-72 sm:w-220 bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200  overflow-x-auto no-scrollbar`}>
      <table className="w-full text-left border-collapse ">
        <thead>
          <tr className="border-b border-gray-300 text-center">
            <th className="py-2 md:py-3 px-3 md:px-4 text-black-600 font-medium">To/From</th>
            <th className="py-2 md:py-3 px-3 md:px-4 text-black-600 font-medium">Type</th>
            <th className="py-2 md:py-3 px-3 md:px-4 text-black-600 font-medium">Description</th>
            <th className="py-2 md:py-3 px-3 md:px-4 text-black-600 font-medium">Date</th>
            <th className="py-2 md:py-3 px-3 md:px-4 text-black-600 font-medium">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
        {Transactions.map(({ amount, date,type,description,otherUserName }) => (
            <tr
              key={Math.random()}
              className="hover:bg-gray-100 transition cursor-pointer text-center"
            >
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-700">{otherUserName}</td>
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-700">{type}</td>
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-900  ">{description}</td>
              <td className="py-2 md:py-3 px-3 md:px-4 text-gray-700">{getDate(date)}</td>
              <td
                className={`py-2 md:py-3 px-3 md:px-4  font-semibold ${
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
            </div>
        </div>
        </div>
  )
}

export default Transactionpage