import React, { useEffect } from "react";
import { useJob } from "../context/JobContext";
import JobCard from "../components/JobCard";

const AllJobsPage = () => {
  const { jobs, getAllJobs } = useJob();

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Browse All Jobs</h1>

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
