import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js"; // Make sure this uses Axios with token handling

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);


  const applyToJob = async (job_id, resumeUrl) => {
    try {
      const res = await api.post(`/applications/apply-job/${job_id}`, {
        resume_url: resumeUrl,
      });
      return res.data;
    } catch (err) {
      throw err?.response?.data || { message: "Application failed" };
    }
  };

  
  const fetchAppliedJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/applications/applied-jobs");
      setAppliedJobs(res.data.applications || []);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/my-applicants");
      setApplicants(res.data.applicants || []);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await api.post(`/update-status/${applicationId}`, { status });
      return res.data;
    } catch (err) {
      throw err?.response?.data || { message: "Failed to update status" };
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        appliedJobs,
        applicants,
        applyToJob,
        fetchAppliedJobs,
        fetchApplicants,
        updateApplicationStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
