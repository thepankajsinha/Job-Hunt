import { Navigate, Route, Routes,  } from "react-router-dom";
import Navbar from "./components/Navbar"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import CreateCompanyPage from "./pages/CreateCompanyPage";
import CreateJobPage from "./pages/CreateJobPage";
import EmployerAllJobPage from "./pages/EmployerAllJobPage";
import MyProfilePage from "./pages/MyProfilePage";

function App() {

  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/create-job" element={<CreateJobPage />} />
        <Route path="/employer-jobs" element={<EmployerAllJobPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
      </Routes>
    </>
  );
}

export default App
