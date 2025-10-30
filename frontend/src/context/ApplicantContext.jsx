import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const ApplicantContext = createContext();
export const useApplicant = () => useContext(ApplicantContext);

export const ApplicantProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(null);

  const getApplicantData = async () => {
    try {
      const res = await api.get("/applicant/profile");
      setApplicant(res.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch applicant data";
      toast.error(errorMessage);
      setApplicant(null);
    } 
  };

  const updateApplicantProfile = async ( first_name, last_name, profile_summary, resume_url, skills, ) => {
    try {
      const res = await api.put("/applicant/update-profile", { first_name, last_name, profile_summary, resume_url, skills, });
      if(res.status === 201) {
        toast.success(res.data.message);
      }
      await getApplicantData();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update applicant profile";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getApplicantData();
  }, []);

  return (
    <ApplicantContext.Provider
      value={{
        applicant,
        getApplicantData,
        updateApplicantProfile,
      }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};
