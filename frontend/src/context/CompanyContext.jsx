import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);

  const getEmployer = async () => {
    try {
      const res = await api.get("/employer/profile");
      setEmployer(res.data.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch employer data";
      toast.error(errorMessage);
      setEmployer(null);
    }
  };

  const updateEmployer = async ({name,description,website_url,logo_url,industry}) => {
    try {
      const res = await api.put("/employer/update-employer", { name, description, website_url, logo_url, industry });
      if (res.status === 201) {
        toast.success(res.data.message);
      }
      await getEmployer();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update employer profile";
      toast.error(errorMessage);
    } 
  };

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
