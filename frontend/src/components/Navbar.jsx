import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };


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

          {!loading && isAuthenticated && user?.role === "job_seeker" && (
            <>
              <Link
                to="/my-profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/edit-profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Edit Profile
              </Link>
              <Link
                to="/applied-jobs"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Applied Jobs
              </Link>
            </>
          )}

          {!loading && isAuthenticated && user?.role === "employer" && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/create-company"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Company
              </Link>
              <Link
                to="/create-job"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Create Job
              </Link>
              <Link
                to="/employer-jobs"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My jobs
              </Link>
              <Link
                to="/applications"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                View Applications
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {!loading && isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            !loading && (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
