import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import EmployerDashboard from "./pages/EmployerDashboard";


function App() {

  const { user } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/jobseeker-dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/jobseeker-dashboard"
          element={<JobSeekerDashboard />}
        />

        <Route
          path="/employer-dashboard"
          element={<EmployerDashboard />}
        />
      </Routes>
    </>
  );
}

export default App
