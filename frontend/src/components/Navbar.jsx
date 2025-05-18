import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">JobWalla</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Find jobs
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            About
          </Link>

          <Link
            to="/jobseeker-dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            {user ? "Dashboard" : ""}
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-blue-600 font-medium border border-blue-600 rounded-xl hover:bg-blue-50 transition"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 text-sm text-white font-medium bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
