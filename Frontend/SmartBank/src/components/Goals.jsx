import React, { useEffect, useState } from 'react'
import Aisidebar from "./Aisidebar"
import Navbar from './Navbar'
import Transaction from './Transaction'
import axios from 'axios'
import { Trash2 } from 'lucide-react'

const Goals = () => {
   const [goals, setGoals] = useState([
      { id: 1, title: "Save ₹50,000 this year", progress: 70 },
      { id: 2, title: "Pay off credit card", progress: 40 },
      { id: 3, title: "Invest in mutual funds", progress: 20 },
    ]);
  return (
    <div>
        <div className={`w-72 sm:w-96 bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200 h-60  overflow-x-auto no-scrollbar`}>
      <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800">Goals: 3</h2>
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
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
              // onClick={() => deleteGoal(goal.id)}
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
  )
}

export default Goals