import { Navigate, Route, Routes,  } from "react-router-dom";
import Navbar from "./components/Navbar"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import CreateCompanyPage from "./pages/CreateCompanyPage";

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
      </Routes>
    </>
  );
}

export default App
