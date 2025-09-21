import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';

const Aisidebar = () => {
      const [chatInput, setChatInput] = useState("");
      const [chatMessages, setChatMessages] = useState([
        { fromAI: true, text: "Hi! Ask me anything about your transactions or finances." },
      ]);
      const chatEndRef = useRef(null);
      async function askAI(prompt) {
          
          if (!prompt) return "Please ask a valid question.";
         
          try {
           const prompt = chatInput
         const response = await axios.post("/ai",{prompt},{withCredentials:true})
         console.log(response?.data?.success);
         return response?.data?.success
          } catch (error) {
            console.error("AI request failed:", error);
            return "Sorry, AI could not process your request.";
          } 
        }
      
       
      const handleSendMessage = async ()=>{
          
         setChatMessages(prev => [...prev, { fromAI: false, text: chatInput }]);
          setChatInput("");
      
          
          const reply = await askAI(chatInput);
      
         
          setChatMessages(prev => [...prev, { fromAI: true, text: reply }]);
         console.log(chatMessages);
         
       
        }
     
  return (
  
      <div className=" flex flex-col bg-white w-86 shadow-md p-4 md:p-6  h-screen border border-gray-200">
            <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Ask BankOfJhonathan
            </h2>
            <div className="h-full overflow-y-auto border rounded-lg p-3 md:p-4 mb-4 space-y-3 bg-gray-50">
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
  )
}

export default Aisidebar