// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await api.post("/user/login", { email, password });
      const { user } = res.data;
      setUser(user);
      alert("Login successful");
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      await api.post("/user/signup", {name,email,password,role});
      alert("User created successfully");
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      alert("Logout successful");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  //always check if user is logged in when the app loads
  

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ signup, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
