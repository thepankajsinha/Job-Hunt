import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Apply for a job
  const applyForJob = async (job_id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/application/apply-job/${job_id}`);
      setLoading(false);
      return response.data.message; // "Job applied successfully"
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to apply for job");
      throw err;
    }
  };

  // Fetch jobs applied by the logged-in job seeker
  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/application/applied-jobs");
      setAppliedJobs(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to fetch applied jobs");
    }
  };

  // Fetch all applicants for employer's jobs
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/application/applicants");
      setApplicants(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to fetch applicants");
    }
  };

  // Update application status (for employer)
  const updateApplicationStatus = async (application_id, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(
        `/application/update-status/${application_id}`,
        {
          status,
        }
      );
      setLoading(false);
      return response.data.message; // "Status updated successfully"
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to update status");
      throw err;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        appliedJobs,
        applicants,
        loading,
        error,
        applyForJob,
        fetchAppliedJobs,
        fetchApplicants,
        updateApplicationStatus,
        setError, // expose to clear error if needed
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
