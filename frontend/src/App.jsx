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
import AppliedJobsPage from "./pages/AppliedJobsPage";
import AllJobsPage from "./pages/AllJobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import RegisterApplicant from "./pages/RegisterApplicant";
import RegisterCompany from "./pages/RegisterCompany";

function App() {

  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register/applicant" element={<RegisterApplicant />} />
        <Route path="/register/employer" element={<RegisterCompany />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/create-job" element={<CreateJobPage />} />
        <Route path="/employer-jobs" element={<EmployerAllJobPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/applied-jobs" element={<AppliedJobsPage />} />
        <Route path="/all-jobs" element={<AllJobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </>
  );
}

export default App
