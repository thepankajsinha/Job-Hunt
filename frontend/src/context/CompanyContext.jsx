import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const res = await api.get("/employer/me");
      setCompany(res.data.employer);
    } catch (err) {
      console.error("Error fetching company", err);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (data) => {
    await api.post("/employer/create", data);
    await fetchCompany();
  };

  const updateCompany = async (data) => {
    await api.put("/employer/update", data);
    await fetchCompany();
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <CompanyContext.Provider
      value={{ company, setCompany, loading, createCompany, updateCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
