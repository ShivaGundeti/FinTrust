// HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <div className="text-center relative z-10 max-w-2xl px-6">
        {/* Logo / Title */}
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-md">
         BankOfJhonathan
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Your money, your control — send, receive, and manage with ease.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} SmartBank. All rights reserved.
      </footer>
    </div>
  );
}
