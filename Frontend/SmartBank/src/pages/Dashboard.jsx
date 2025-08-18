import React, { useState, useEffect, useRef } from "react";
import {
  CreditCard,
  DollarSign,
  Bell,
  TrendingUp,
  Send,
  UserCircle2,
  MessageSquare,
  Wallet,
  Coins,
} from "lucide-react";
import axios from "axios";
import SendMoney from "../components/Contacts";
import QuickContacts from "../components/QuickContacts";
import Transaction from "../components/Transaction";
import Navbar from "../components/Navbar";
// import Goals from "../components/Navbar";
   import { useNavigate } from 'react-router-dom';
import Goals from "../components/Goals";
export default function Dashboard() {
  const navigate = useNavigate();
  const [ExistingUsers, setExistingUsers] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [user, setUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { fromAI: true, text: "Hi! Ask me anything about your transactions or finances." },
  ]);
  const chatEndRef = useRef(null);

  // Fetch current user
  async function userdata() {
    try {
      const response = await axios.get("https://fintrust-3q8n.onrender.com/auth/getUser", { withCredentials: true });
      setUser(response?.data?.userdata);
    } catch (error) {
      console.error("Failed to get user:", error);
    }
  }

  // Fetch all users for contacts
  async function GetUsers() {
    try {
      const response = await axios.get("https://fintrust-3q8n.onrender.com/auth/getUsers", { withCredentials: true });
      setExistingUsers(response?.data?.Users);
    } catch (error) {
      console.error("Failed to get users:", error);
    }
  }
  const reload = ()=>{
    location.reload()
  }


  // // Ask AI a custom question
  async function askAI(prompt) {
    
    if (!prompt) return "Please ask a valid question.";
   
    try {
     const prompt = chatInput
   const response = await axios.post("https://fintrust-3q8n.onrender.com/ai",{prompt},{withCredentials:true})
   console.log(response?.data?.success);
   return response?.data?.success
    } catch (error) {
      console.error("AI request failed:", error);
      return "Sorry, AI could not process your request.";
    } 
  }

 
  useEffect(() => {
    userdata();
    GetUsers();
  }, []);


  const handleSendMessage = async ()=>{
    
   setChatMessages(prev => [...prev, { fromAI: false, text: chatInput }]);
    setChatInput("");

    
    const reply = await askAI(chatInput);

   
    setChatMessages(prev => [...prev, { fromAI: true, text: reply }]);
   console.log(chatMessages);
   
 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar/>
    
      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-grow p-4 md:p-6 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
        {/* Left Panel */}
        <section className="flex flex-col flex-grow w-full md:w-1/3 space-y-4 md:space-y-6">
          {/* Balance Card */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200 flex items-center justify-between">
            <div className="flex-col">
              <h2 className="text-base md:text-lg font-semibold mb-2 text-gray-800">Current Balance</h2>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                ₹{user?.balance?.toLocaleString()}
              </p>
            </div>
            <div>
              <Coins size={60} />
            </div>
          </div>

          {/* Quick Contacts */}
          <QuickContacts currentUser={user} Users={ExistingUsers} />

          {/* Send Money */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200">
            <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Send className="w-5 h-5 text-blue-600" /> Send Money
            </h2>
            <SendMoney currentUser={user} contacts={ExistingUsers} refreshUser={userdata} reload={reload}/>
          </div>
        </section>

        {/* Right Panel */}
        <section className="flex flex-col flex-grow w-full md:w-2/3 space-y-4 md:space-y-6">
          {/* Chatbot */}
          <div className="flex flex-col bg-white rounded-xl shadow-md p-4 md:p-6 h-[400px] md:h-[450px] border border-gray-200">
            <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Ask FinTrust
            </h2>
            <div className="flex-grow overflow-y-auto border rounded-lg p-3 md:p-4 mb-4 space-y-3 bg-gray-50">
              {chatMessages.map(({ fromAI, text }, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    fromAI ? "bg-blue-100 text-blue-900 self-start" : "bg-blue-600 text-white self-end"
                  }`}
                >
                  {text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about your transactions..."
                className="w-20 flex-grow rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 md:px-5 font-semibold transition"
              >
                Send
              </button>
            </div>
           
          </div>

          
         <div className="flex gap-6 sm:flex-row flex-col">
          <div onClick={()=>{navigate("/dashboard/transaction")}}>
           <Transaction currentUser={user}  />
          </div>
            <div onClick={()=>{navigate("/dashboard/goals")}}>
           <Goals/>
          </div>
         </div>
        </section>
      </main>
    </div>
  );
}
