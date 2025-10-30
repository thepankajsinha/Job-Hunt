import React, { useEffect, useState } from "react";
import { useJob } from "../context/JobContext";
import JobCard from "../components/JobCard";

const AllJobsPage = () => {
  const { jobs, getFilteredJobs } = useJob();
  
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch all jobs initially (no filters)
  useEffect(() => {
    getFilteredJobs({});
  }, []);

  const handleSearch = () => {
    getFilteredJobs({
      job_type: jobType,
      job_location: location,
      keyword: searchKeyword,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Browse All Jobs</h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by job title..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Job Listing */}
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobsPage;
