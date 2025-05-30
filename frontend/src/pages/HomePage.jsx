import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useJob } from "../context/JobContext";

const HomePage = () => {
  const { jobs, getAllJobs, loading } = useJob();

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-15">
          <h1 className="text-6xl font-bold text-black mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-xl">
            Explore top opportunities and apply with one click.
          </p>
          <Link to="/all-jobs">
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
              Browse All Jobs
            </button>
          </Link>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
          ) : (
            jobs.slice(0, 6).map((job) => (
              <div
                key={job.job_id}
                className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-14 h-14 object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {job.job_title}
                      </h2>
                      <p className="text-gray-700">
                        {job.company_name} • {job.location}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {job.job_type} • {job.salary_range}
                      </p>
                    </div>
                  </div>
                  <Link to={`/job/${job.job_id}`}>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 text-sm">
                      View / Apply
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
