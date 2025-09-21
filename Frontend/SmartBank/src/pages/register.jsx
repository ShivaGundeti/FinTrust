import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const regex = {
    firstName: /^[A-Za-z]{2,}$/,
    lastName: /^[A-Za-z]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    phone: /^[0-9]{10}$/,
    address: /^.{5,}$/,
    pin: /^[0-9]{4}$/, // exactly 4 digits
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (!regex[field].test(form[field])) {
        newErrors[field] = `Invalid ${field.replace(/([A-Z])/g, " $1")}`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      try {
        await axios.post(
          "https://fintrust-backend.onrender.com/auth/register",
          form
        );
        navigate('/login')
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
            BankOfJhonathan
          </span>
        </h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Secure banking made simple — your future starts here.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center items-center p-8 bg-gray-50">
        <form
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create Your Account
          </h2>

          {/* First Name */}
          <div>
            <label className="block text-gray-600 mb-1">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 mb-1">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters, include 1 uppercase and
                1 number.
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              className={`w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* PIN */}
          <div>
            <label className="block text-gray-600 mb-1">PIN</label>
            <input
              name="pin"
              type="password"
              placeholder="Enter 4-digit PIN"
              value={form.pin}
              onChange={handleChange}
              className={`w-full border ${
                errors.pin ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.pin && (
              <p className="text-red-500 text-sm">
                PIN must be exactly 4 digits.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Register
          </button>

          {/* Already a User */}
          <p className="text-center text-gray-600 text-sm">
            Already a user?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
