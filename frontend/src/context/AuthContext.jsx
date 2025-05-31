import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const registerApplicant = async ({
    first_name,
    last_name,
    profile_summary,
    resume_url,
    skills,
    email,
    password,
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register/applicant", {
        first_name,
        last_name,
        profile_summary,
        resume_url,
        skills,
        email,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const registerEmployer = async ({
    name,
    description,
    website_url,
    logo_url,
    industry, 
    email,
    password,
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register/employer", {
        name,
        description,
        website_url,
        logo_url,
        industry,
        email,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.data);
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/logout");
      setUser(null);
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Logout failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
