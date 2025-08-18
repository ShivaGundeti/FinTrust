// import React from 'react'
// import Navbar from '../components/Navbar'
// import Aisidebar from '../components/Aisidebar'

// const Goals = () => {
//   return (
//     <div>
//       <Navbar/>
//       <div>
//         <Aisidebar/>
//       </div>
//       <div>

//       </div>
//     </div>
//   )
// }

// export default Goals

import React, { useState } from "react";
import { CheckCircle, Target, Plus, Trash2 } from "lucide-react";
import Aisidebar from "../components/Aisidebar";
import Navbar from "../components/Navbar";

const GoalsPage = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: "Save ₹50,000 this year", progress: 70 },
    { id: 2, title: "Pay off credit card", progress: 40 },
    { id: 3, title: "Invest in mutual funds", progress: 20 },
  ]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      { id: goals.length + 1, title: newGoal, progress: 0 },
    ]);
    setNewGoal("");
  };
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };
  return (
   <>
   <Navbar/>
   <div className="flex">
    <Aisidebar/>
   <div className="p-10 w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Target className="text-blue-600" size={30} /> My Goals
      </h1>

      {/* Add New Goal */}
      <div className="flex gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter your goal..."
          className="flex-1 border rounded-xl px-5 py-3 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button
          onClick={addGoal}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Goals List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col justify-between relative"
          >
            {/* Delete Button */}
          

            {/* Title */}
            <h3 className="font-semibold text-gray-800 text-lg mb-3">
              {goal.title}
            </h3>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Progress: <span className="font-medium">{goal.progress}%</span>
              </p>
            </div>

            {/* Status Icon */}
            <div className="flex justify-end">
                <button
              onClick={() => deleteGoal(goal.id)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <Trash2 size={20} />
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
   </>
  );
};

export default GoalsPage;
