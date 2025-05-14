import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import HomePage from "./pages/HomePage";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/jobseeker-dashboard"
          element={<JobSeekerDashboard />}
        />
      </Routes>
    </>
  );
}

export default App
