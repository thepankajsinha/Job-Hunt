import React, { useEffect } from "react";
import { useJob } from "../context/JobContext";
import { Link } from "react-router-dom";

const AllJobsPage = () => {
  const { jobs, loading, getAllJobs } = useJob();

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          Available Jobs
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-black">
                        {job.job_title}
                      </h2>
                      <p className="text-gray-700">
                        Company: {job.company_name}
                      </p>
                      <p className="text-gray-700">Location: {job.location}</p>
                      <p className="text-gray-700">Type: {job.job_type}</p>
                      <p className="text-gray-700">
                        Salary: {job.salary_range}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Posted at:{" "}
                        {new Date(job.posted_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/jobs/${job.job_id}`}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobsPage;
