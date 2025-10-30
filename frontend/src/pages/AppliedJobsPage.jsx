import React, { useEffect } from "react";
import { useApplication } from "../context/ApplicationContext";
import { Link } from "react-router-dom";

const AppliedJobsPage = () => {
  const { appliedJobs, fetchAppliedJobs, loading } = useApplication();

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center">
        My Applied Jobs
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && appliedJobs.length === 0 && (
        <p className="text-gray-600">You haven't applied to any jobs yet.</p>
      )}

      <div className="grid gap-6">
        {appliedJobs.map((job) => {
          const appliedDate = job.applied_at
            ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
                new Date(job.applied_at)
              )
            : "N/A";

          return (
            <div
              key={job.job_id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex gap-4">
                  <img
                    src={job.logo_url || "/placeholder-logo.png"}
                    alt={job.company_name}
                    className="w-16 h-16 object-contain rounded-md bg-gray-50"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-black">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      Company: {job.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        📍 {job.job_location || "N/A"}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        🕒 {job.job_type || "N/A"}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        💰 {job.salary_range || "Not disclosed"}
                      </span>
                      <span className="bg-gray-200 text-black px-2 py-1 rounded-full font-medium">
                        📌 Status: {job.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Applied on: {appliedDate}
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    to={`/jobs/${job.job_id}`}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
