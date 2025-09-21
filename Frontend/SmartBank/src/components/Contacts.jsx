import axios from 'axios';
import React, { useState } from 'react'

function SendMoney({ currentUser, contacts,refreshUser }) {

    const [Number, setNumber] = useState("")
  const [selectedContact, setSelectedContact] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [description, setDescription] = useState("");
const [pin, setPin] = useState(["", "", "", ""]);

const handlePinChange = (value, index) => {
  if (value.length > 1) return; // allow only single digit
  const newPin = [...pin];
  newPin[index] = value;
  setPin(newPin);

  // auto-focus next input
  if (value && index < 3) {
    document.getElementById(`pin-${index + 1}`).focus();
  }
};

  const handleSend = () => {
    if (!amount || +amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

     setShowPinModal(true)
    
  };


  const sendamount = async ()=>{
   try {
     await axios.post("https://fintrust-backend.onrender.com/payment/send",{
         senderid: currentUser._id,
         receiverid:selectedContact._id,
         amount: +amount,
         pin: pin.join(""),
         description
        })
        refreshUser();
        // reload()
     setAmount("");
   
   } catch (error) {
    console.log("Tran:",error);
    
   }
    
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold text-gray-700">Search Person</label>


      <input
        type="Number"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Number"
        value={Number}
        onChange={(e) => setNumber(e.target.value)}
      />
      {Number.length > 0 && 
  contacts
    .filter((user) => user.phone != currentUser.phone && user.phone.startsWith(Number))
    .map((item) => (
      <div key={item.phone} className="border border-blue-300 rounded p-2" onClick={()=>{setSelectedContact(item);setNumber("")}
      }>
        {item.firstName}
      </div>
    ))
}



{ selectedContact && (
    <>
    <label className="font-semibold text-gray-700">Send to: </label>
      <div className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
        {selectedContact.firstName}
      </div>
       <label className="font-semibold text-gray-700">Description: </label>
         <input
        type="text"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
    </>
      )}
     
      <label className="font-semibold text-gray-700">Amount (₹)</label>
      <input
        type="number"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Send Money
      </button>
      {showPinModal && (
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4 text-center">Enter Your PIN</h2>
      <div className="flex justify-center gap-3 mb-6">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="password"
            value={digit}
            maxLength={1}
            onChange={(e) => handlePinChange(e.target.value, index)}
            className="w-12 h-12 border rounded-lg text-center text-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setShowPinModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
          
            setShowPinModal(false);
            sendamount()
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default SendMoney