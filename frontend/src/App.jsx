import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateJobPage from "./pages/CreateJobPage";
import EmployerAllJobPage from "./pages/EmployerAllJobPage";
import MyProfilePage from "./pages/MyProfilePage";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import AllJobsPage from "./pages/AllJobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import RegisterApplicant from "./pages/RegisterApplicant";
import RegisterCompany from "./pages/RegisterCompany";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  const isEmployer = user?.role === "employer";
  const isApplicant = user?.role === "applicant";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register/applicant"
          element={!user ? <RegisterApplicant /> : <Navigate to="/" />}
        />
        <Route
          path="/register/employer"
          element={!user ? <RegisterCompany /> : <Navigate to="/" />}
        />

        {/* Shared Authenticated Routes */}
        {user && (
          <>
            <Route path="/my-profile" element={<MyProfilePage />} />
            <Route path="/all-jobs" element={<AllJobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
          </>
        )}

        {/* Applicant Only Routes */}
        {isApplicant && (
          <Route path="/applied-jobs" element={<AppliedJobsPage />} />
        )}

        {/* Employer Only Routes */}
        {isEmployer && (
          <>
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/employer-jobs" element={<EmployerAllJobPage />} />
          </>
        )}

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
