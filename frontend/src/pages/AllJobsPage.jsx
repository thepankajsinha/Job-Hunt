import React, { useEffect } from "react";
import { useJob } from "../context/JobContext";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

const AllJobsPage = () => {
  const { jobs, loading, getAllJobs } = useJob();

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Browse All Jobs</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
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
