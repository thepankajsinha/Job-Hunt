import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser, actionLoading } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* ✅ Logo (always redirects home) */}
          <Link to="/">
            <div className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              ResuAi
            </div>
          </Link>

          {/* ✅ Centered Analyse Button (for logged-in users) */}
          {user && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/resume/mode">
                <button
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md
                  shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 
                  transition-all duration-300"
                >
                  Analyse Resume
                </button>
              </Link>
            </div>
          )}

          {/* ✅ Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                {/* When not logged in */}
                <Link to="/login">
                  <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                {/* When logged in */}
                <span className="text-gray-700 font-medium hidden sm:inline">
                  Hi, {user.name?.split(" ")[0]}
                </span>

                <button
                  onClick={handleLogout}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    actionLoading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {actionLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
