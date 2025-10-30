import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";

export default function UpdateJobPage() {
  const { job_id } = useParams();
  const { getJobById, updateJob } = useJob();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchJob() {
      const job = await getJobById(job_id);
      if (job) {
        setJobTitle(job.job_title || "");
        setJobLocation(job.job_location || "");
        setJobType(job.job_type || "");
        setSalaryRange(job.salary_range || "");
        setDescription(job.job_description || "");
      }
    }

    fetchJob();
  }, [job_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      job_title: jobTitle,
      job_location: jobLocation,
      job_type: jobType,
      salary_range: salaryRange,
      job_description: description,
    };

    await updateJob(job_id, updatedJob);
  };


  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Update Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          placeholder="Job Type"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
          placeholder="Salary Range"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
