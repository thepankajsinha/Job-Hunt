import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useApplication } from "../context/ApplicationContext";

const JobDetailPage = () => {
  const { id } = useParams();
  const { jobDetails, getJobById, loading } = useJob();
  const {applyToJob} = useApplication();

  useEffect(() => {
    getJobById(id);
  }, [id]);

  const handleApply = async () => {
    const resumeUrl = prompt(
      "Please enter your public Google Drive resume link to apply:"
    );
    if (!resumeUrl || !resumeUrl.trim()) {
      alert("Application cancelled. You must provide a resume link.");
      return;
    }


    try {
      await applyToJob(id, resumeUrl.trim());
      alert("Application submitted successfully!");
    } catch (error) {
      alert("Failed to submit application. Please try again.");
    }
  };

  if (loading || !jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  const job = jobDetails;

  return (
    <div className="min-h-screen bg-white py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
      <p className="text-gray-700 mb-4">{job.job_description}</p>

      <div className="mb-4 space-y-1">
        <p>
          <strong>Company:</strong> {job.company_name}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Type:</strong> {job.job_type}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary_range}
        </p>
        <p>
          <strong>Posted at:</strong>{" "}
          {new Date(job.posted_at).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleApply}
        className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetailPage;
