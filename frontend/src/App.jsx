import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateJobPage from "./pages/CreateJobPage";
import EmployerAllJobPage from "./pages/EmployerAllJobPage";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import AllJobsPage from "./pages/AllJobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import RegisterApplicant from "./pages/RegisterApplicant";
import RegisterCompany from "./pages/RegisterCompany";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";

function App() {
  const { user } = useAuth();

  const isEmployer = user?.role === "employer";
  const isApplicant = user?.role === "job_seeker";

  return (
    <>
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<AllJobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />

        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register/applicant" element={!user ? <RegisterApplicant /> : <Navigate to="/" />} />
        <Route path="/register/employer" element={!user ? <RegisterCompany /> : <Navigate to="/" />} />


        {/* Applicant Only Routes */}
        {isApplicant && (
          <>
            <Route path="/applicant/applied-jobs" element={<AppliedJobsPage />} />
            <Route path="/applicant/profile" element={<ApplicantProfilePage />} />
          </>
        )}


        {/* Employer Only Routes */}
        {isEmployer && (
          <>
            <Route path="/employer/create-job" element={<CreateJobPage />} />
            <Route path="/employer/created-jobs" element={<EmployerAllJobPage />} />
          </>
        )}  
      </Routes>
    </>
  );
}

export default App;
