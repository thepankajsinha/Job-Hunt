import React, { useState } from "react";
import { useJob } from "../context/JobContext";

export default function CreateJobPage() {
  const { createJob, loading } = useJob();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      job_title: jobTitle,
      job_description: jobDescription,
      job_location: jobLocation,
      salary_range: salaryRange,
      job_type: jobType,
    };

    await createJob(newJob);

    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
    setSalaryRange("");
    setJobType("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Create New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Job Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Job Description
          </label>
          <textarea
            required
            rows={4}
            placeholder="e.g. Develop and maintain web applications..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none resize-none"
          />
        </div>

        {/* Job Location */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Job Location
          </label>
          <input
            type="text"
            required
            placeholder="e.g. New Delhi, India"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Salary Range
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ₹5,00,000 - ₹8,00,000 per annum"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Job Type
          </label>
          <select
            required
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
