import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">JobWalla</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            About
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <a
            href="#"
            className="px-4 py-2 text-sm text-blue-600 font-medium border border-blue-600 rounded-xl hover:bg-blue-50 transition"
          >
            Log In
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm text-white font-medium bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}
