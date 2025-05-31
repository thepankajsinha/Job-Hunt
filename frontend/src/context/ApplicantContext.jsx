import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ApplicantContext = createContext();
export const useApplicant = () => useContext(ApplicantContext);

export const ApplicantProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(null);

  const getApplicantData = async () => {
    try {
      const res = await api.get("/applicant/profile");
      setApplicant(res.data.data);
    } catch (err) {
      console.error(
        "Error fetching applicant:",
        err.response?.data || err.message
      );
    } 
  };

  const updateApplicantProfile = async (
    first_name,
    last_name,
    profile_summary,
    resume_url,
    skills,
  ) => {
    try {
      await api.put("/applicant/update-profile", {
        first_name,
        last_name,
        profile_summary,
        resume_url,
        skills,
      });
      await getApplicantData();
    } catch (err) {
      console.error(
        "Error updating applicant:",
        err.response?.data || err.message
      );
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
