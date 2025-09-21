import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
  };

  const validate = () => {
    let tempErrors = {};
    if (!regex.email.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (!regex.password.test(formData.password)) {
      tempErrors.password =
        "Password must be at least 6 characters and contain letters and numbers";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (validate()) {
      
     const response = await axios.post("http://localhost:3000/auth/login", formData, {
        withCredentials: true, 
      });
    
      
     if (response.status === 200 && response.data.success) {
      navigate("/dashboard");
    } else {
      console.log("Login failed:", response.data.message || response);
      
    }
    }
  } catch (error) {
    console.log("Login Error: ", error);
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center sm:w-1/2 bg-blue-700 text-white p-8">
       <h1 className="text-5xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
            FinTrust
          </span>
        </h1>
        <p className="mt-4 text-lg text-center">
          Secure banking made simple — login to manage your account.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center sm:w-1/2 p-8 bg-gray-50">
        <form
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
