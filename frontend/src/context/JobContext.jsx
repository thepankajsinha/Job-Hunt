import React, { createContext, useContext, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [employerJobs, setEmployerJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const res = await api.get("/job/all-jobs");
      setJobs(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch jobs.");
    }
  };

  const getJobById = async (job_id) => {
    try {
      const res = await api.get(`/job/${job_id}`);
      setJobDetails(res.data.data);
      return res.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch job.");
    }
  };


  const createJob = async (jobData) => {
    try {
      const res = await api.post("/job/create-job", jobData);
      if(res.status === 201) {
        toast.success(res.data.message);
      }
      await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create job.");
    }
  };

  const updateJob = async (job_id, updatedData) => {
    try {
      const res = await api.put(`/job/update-job/${job_id}`, updatedData);
      if(res.status === 200) {
        toast.success(res.data.message);
      }
      await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job.");
    }
  };

  const deleteJob = async (job_id) => {
    try {
      const res = await api.delete(`/job/delete-job/${job_id}`);
      if(res.status === 200) {
        toast.success(res.data.message);
      }
      await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job.");
    }
  };

  const getMyJobs = async () => {
    try {
      const res = await api.get("/job/my-jobs");
      setEmployerJobs(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch your jobs.");
    }
  };

  const getFilteredJobs = async (filters = {}) => {
    try {
      // Build query params string from filters object
      const queryParams = new URLSearchParams();

      if (filters.job_type) queryParams.append("job_type", filters.job_type);
      if (filters.job_location)
        queryParams.append("job_location", filters.job_location);
      if (filters.keyword) queryParams.append("keyword", filters.keyword);

      const res = await api.get(`/job/filtered-jobs?${queryParams.toString()}`);
      setJobs(res.data.data);

      if(res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch filtered jobs."
      );
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        jobDetails,
        employerJobs,
        getAllJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        getMyJobs,
        getFilteredJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
