import React, { useEffect } from "react";
import { useJob } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

export default function EmployerJobsPage() {
  const { employerJobs, getMyJobs, deleteJob } = useJob();
  const navigate = useNavigate();

  useEffect(() => {
    getMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      await deleteJob(jobId);
      await getMyJobs(); // Refresh the employer jobs list after deletion
    }
  };

  const formattedDate = (dateStr) =>
    new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
      new Date(dateStr)
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        My Posted Jobs
      </h1>

      {employerJobs.length === 0 ? (
        <p className="text-center text-black">
          You haven't posted any jobs yet.
        </p>
      ) : (
        <div className="space-y-6">
          {employerJobs.map((job) => (
            <div
              key={job.job_id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex gap-4">
                  <img
                    src={job.logo_url}
                    alt={job.name}
                    className="w-16 h-16 object-contain rounded-md bg-gray-50"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-black">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-700 text-sm">Company: {job.name}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        📍 {job.job_location}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        🕒 {job.job_type}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        💰 {job.salary_range}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Posted on: {formattedDate(job.posted_at)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <button onClick={() => navigate(`/job/update-job/${job.job_id}`)} className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900" > Update </button>
                  <button
                    onClick={() => handleDelete(job.job_id)}
                    className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
