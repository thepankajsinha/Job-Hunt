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
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-black hover:text-gray-800"
        >
          JobWalla
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-black text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/all-jobs"
            className="text-gray-700 hover:text-black text-sm font-medium"
          >
            Find Jobs
          </Link>

          {!loading && isAuthenticated && user?.role === "job_seeker" && (
            <>
              <Link
                to="/my-profile"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/applied-jobs"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                My Applied Jobs
              </Link>
            </>
          )}

          {!loading && isAuthenticated && user?.role === "employer" && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/create-company"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                My Company
              </Link>
              <Link
                to="/create-job"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                Create Job
              </Link>
              <Link
                to="/employer-jobs"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                My Jobs
              </Link>
              <Link
                to="/applications"
                className="text-gray-700 hover:text-black text-sm font-medium"
              >
                View Applications
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          {!loading && isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Logout
            </button>
          ) : (
            !loading && (
              <>
                <Link
                  to="/login"
                  className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register/applicant"
                  className="border border-black text-black bg-white text-sm px-4 py-2 rounded-md hover:bg-black hover:text-white"
                >
                  Applicant
                </Link>
                <Link
                  to="/register/employer"
                  className="border border-black text-black bg-white text-sm px-4 py-2 rounded-md hover:bg-black hover:text-white"
                >
                  Employer
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
