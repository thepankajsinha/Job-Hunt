import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);


  const applyForJob = async (job_id) => {
    try {
      const res = await api.post(`/application/apply-job/${job_id}`);
      if (res.status === 201) {
        toast.success(res.data.message);
        await fetchAppliedJobs();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to apply for job";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };


  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/application/applied-jobs");
      setAppliedJobs(res.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch applied jobs";
      toast.error(errorMessage);
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await api.get("/application/applicants");
      setApplicants(res.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch applicants";
      toast.error(errorMessage);
    }
  };

  const updateApplicationStatus = async (application_id, status) => {
    try {
      const res = await api.post( `/application/update-status/${application_id}`, { status } );
      if (res.status === 200) {
        toast.success(res.data.message);
        await fetchApplicants();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update application status";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        appliedJobs,
        applicants,
        applyForJob,
        fetchAppliedJobs,
        fetchApplicants,
        updateApplicationStatus
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
