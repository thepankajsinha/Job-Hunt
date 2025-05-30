import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useApplication } from "../context/ApplicationContext.jsx";

const AppliedJobsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { appliedJobs, fetchAppliedJobs, loading } = useApplication();

  useEffect(() => {
    if (user) fetchAppliedJobs();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading applied jobs...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600 text-lg">
          Please log in to view your applied jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          My Applied Jobs
        </h1>

        {appliedJobs.length === 0 ? (
          <p className="text-center text-gray-600">No applied jobs found.</p>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div
                key={job.job_id}
                className="border border-black rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      Applied At:{" "}
                      {new Date(job.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === "applied"
                          ? "bg-yellow-100 text-yellow-800"
                          : job.status === "hired"
                          ? "bg-green-100 text-green-800"
                          : job.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status}
                    </span>
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

export default AppliedJobsPage;
