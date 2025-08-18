import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import Register from "./pages/register"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from './pages/PrivateRoute';
import Transactionpage from './pages/Transaction';
import Goals from './pages/Goals';
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/transaction"
        element={
          <PrivateRoute>
            <Transactionpage />
          </PrivateRoute>
        }
      />
       <Route
        path="/dashboard/goals"
        element={
          <PrivateRoute>
            <Goals />
          </PrivateRoute>
        }
      />
      </Routes>

    </div>
  )
}

export default App