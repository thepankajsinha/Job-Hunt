import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);



  const registerApplicant = async ({ first_name, last_name, profile_summary, resume_url, skills, email, password, }) => {
    try {
      const res = await api.post("/auth/register/applicant", { first_name, last_name, profile_summary, resume_url, skills, email, password, });
      if(res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message
      toast.error(errorMessage || "Registration failed");
    }
  };

  const registerEmployer = async ({ name, description, website_url, logo_url, industry, email, password, }) => {
    try {
      const res = await api.post("/auth/register/employer", { name, description, website_url, logo_url, industry, email, password, });
      if(res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.data);
      if (res.status === 200) {
        toast.success("Login successful");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      setUser(null);
      if (res.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerApplicant,
        registerEmployer,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
