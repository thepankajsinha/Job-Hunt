import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ Fetch current user (runs once on refresh)
  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/user/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // ✅ ensures user persists after refresh
  }, []);

  // ✅ Register
  const registerUser = async (name, email, password) => {
    setActionLoading(true);
    try {
      const res = await api.post("/user/register", { name, email, password });
      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering user");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Login
  const loginUser = async (email, password) => {
    setActionLoading(true);
    try {
      const res = await api.post("/user/login", { email, password });
      setUser(res.data.user);
      toast.success(res.data.message || "Login successful");
      navigate("/resume/mode");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Logout
  const logoutUser = async () => {
    setActionLoading(true);
    try {
      const res = await api.post("/user/logout");
      setUser(null);
      toast.success(res.data.message || "Logout successful");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        actionLoading,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
