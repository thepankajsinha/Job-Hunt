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
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
