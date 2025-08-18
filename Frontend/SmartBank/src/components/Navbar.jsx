import axios, { Axios } from 'axios';
import { UserCircle2, Wallet } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("https://fintrust-3q8n.onrender.com/auth/getUser", { withCredentials: true })
      .then(res => setUser(res?.data?.userdata))
      .catch(err => console.error("Failed to fetch user:", err));
  }, []);
    const handlelogout = async ()=>{
    await axios.post("https://fintrust-3q8n.onrender.com/auth/logout",{},{withCredentials:true});
    navigate("/login")
    
    }
  return (
    <div>  
        {user && (
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-3 text-blue-700 font-extrabold text-2xl">
          <Wallet className="w-8 h-8" />
          <span>FinTrust</span>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-gray-600">
          <li className="hover:text-blue-600 cursor-pointer transition"
           onClick={()=>{navigate("/dashboard")}}>Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer transition"
          onClick={()=>{navigate("/dashboard/transaction")}}>Transactions</li>
          <li className="hover:text-blue-600 cursor-pointer transition"
           onClick={()=>{navigate("/dashboard/goals")}}>Goals</li>
        </ul>
        <div className="flex items-center space-x-3 text-gray-700 font-semibold cursor-pointer">
          <UserCircle2 className="w-8 h-8" />
          <span>{user?.firstName}</span>
          <span onClick={handlelogout}>Logout</span>
        </div>
      
      </nav>
        )}
      </div>
  )
}

export default Navbar