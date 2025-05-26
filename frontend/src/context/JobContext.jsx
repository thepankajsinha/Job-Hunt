import React, { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get all jobs
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/all-jobs");
      setJobs(res.data.jobs); // assuming jobs are in res.data.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Get job by ID
  const getJobById = async (job_id) => {
    setLoading(true);
    try {
      const res = await api.get(`/jobs/${job_id}`);
      setJobDetails(res.data.job);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job.");
    } finally {
      setLoading(false);
    }
  };

  // Create new job
  const createJob = async (jobData) => {
    setLoading(true);
    try {
      const res = await api.post("/jobs/create", jobData);
      await getAllJobs(); // refresh list after creation
      alert(res.data.message);
    } catch (err) {
        alert(err.response?.data?.message || "Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  // Update job
  const updateJob = async (job_id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/jobs/update/${job_id}`, updatedData);
      await getAllJobs(); // refresh list after update
      alert(res.data.message);
    } catch (err) {
        alert(err.response?.data?.message || "Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  // Delete job
  const deleteJob = async (job_id) => {
    setLoading(true);
    try {
      const res = await api.delete(`/jobs/delete/${job_id}`);
      await getAllJobs(); // refresh list after deletion
      alert(res.data.message);
    } catch (err) {
        alert(err.response?.data?.message || "Failed to delete job.");  
    } finally {
      setLoading(false);
    }
  };

  const getMyJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/my-jobs");
      return res.data; // assuming jobs are in res.data.jobs
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch my jobs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        jobDetails,
        getAllJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        getMyJobs,
        loading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
