import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useApplication } from "../context/ApplicationContext";

const JobDetailPage = () => {
  const { job_id } = useParams();
  const { jobDetails, getJobById } = useJob();
  const { applyForJob } = useApplication();

  useEffect(() => {
    getJobById(job_id);
  }, [job_id]);

  const handleApply = async () => {
    await applyForJob(job_id);
  };

  if (!jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Job not found.</p>
      </div>
    );
  }

  const job = jobDetails;
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(job.posted_at));

  return (
    <div className="min-h-screen bg-white py-10 px-6 max-w-4xl mx-auto">
      <div className="border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          {job.logo_url && (
            <img
              src={job.logo_url}
              alt={job.name}
              className="w-16 h-16 object-contain rounded bg-gray-50"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-black">{job.job_title}</h1>
            <p className="text-gray-600">{job.name}</p>
          </div>
        </div>

        <p className="text-gray-800 mb-6 leading-relaxed whitespace-pre-line">
          {job.job_description}
        </p>

        <div className="space-y-2 text-sm text-gray-700 mb-6">
          <p>
            <span className="font-semibold">📍 Location:</span>{" "}
            {job.job_location}
          </p>
          <p>
            <span className="font-semibold">🕒 Type:</span> {job.job_type}
          </p>
          <p>
            <span className="font-semibold">💰 Salary:</span> {job.salary_range}
          </p>
          <p>
            <span className="font-semibold">📅 Posted on:</span> {formattedDate}
          </p>
        </div>

        <button
          onClick={handleApply}
          className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailPage;
