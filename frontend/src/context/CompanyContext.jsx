import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);

  // Fetch current employer
  const getEmployer = async () => {
    try {
      const response = await api.get("/employer/profile");
      setEmployer(response.data.data);
    } catch (error) {
      console.error("Failed to fetch employer:", error);
    }
  };

  // Update employer profile
  const updateEmployer = async ({name,description,website_url,logo_url,industry}) => {
    try {
      const response = await api.put("/employer/update-employer", { name, description, website_url, logo_url, industry });
      await getEmployer(); // Re-fetch after update
      return response.data;
    } catch (error) {
      console.error("Failed to update employer:", error);
      throw error;
    } 
  };

  // Fetch employer on mount
  useEffect(() => {
    getEmployer();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        employer,
        getEmployer,
        updateEmployer,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
