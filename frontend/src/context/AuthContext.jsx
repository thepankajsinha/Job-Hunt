import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/my-profile");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(errorMessage);
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password, role });
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(errorMessage);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Logout failed";
      alert(errorMessage);
    }
  };

  const updateProfile = async (name, email, password) => {
    try {
      const res = await api.put("/user/update-profile", { name, email, password });
      alert(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update profile";
      alert(errorMessage);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{ signup, login, user, logout, loading, isAuthenticated , updateProfile}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
