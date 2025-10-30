import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ChooseModePage from "./pages/ChooseModePage";
import JobMatchingPage from "./pages/JobMatchingPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  // ⏳ Show global loader while checking user auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-blue-600 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            !user ? <SignupPage /> : <Navigate to="/resume/mode" replace />
          }
        />
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to="/resume/mode" replace />
          }
        />

        {/* ✅ Resume Routes — Only for logged-in users */}
        <Route
          path="/resume/mode"
          element={user ? <ChooseModePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/resume/analyse"
          element={
            user ? <ResumeUploadPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/resume/job-match"
          element={
            user ? <JobMatchingPage /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
