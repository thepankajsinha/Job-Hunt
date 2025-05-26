import React, { useEffect, useState } from "react";
import { useJob } from "../context/JobContext.jsx";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Pencil, Trash2 } from "lucide-react";

export default function EmployerAllJobPage() {
  const [jobs, setJobs] = useState([]);
  const { getMyJobs, deleteJob } = useJob();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getMyJobs();
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, [getMyJobs]);

  const handleDelete = async (job_id) => {
    try {
      await deleteJob(job_id);
      setJobs(jobs.filter((job) => job.job_id !== job_id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdate = (job_id) => {
    navigate(`/update-job/${job_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-200"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Briefcase size={20} className="text-indigo-500" />
                  {job.job_title}
                </h3>
                <p className="text-sm text-gray-600 italic mb-1">
                  {job.job_type}
                </p>
                <p className="flex items-center text-gray-700 text-sm">
                  <MapPin size={16} className="mr-1 text-blue-500" />
                  {job.location}
                </p>
                <p className="flex items-center text-gray-700 text-sm mb-3">
                  <DollarSign size={16} className="mr-1 text-green-500" />
                  {job.salary_range}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {job.job_description}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleUpdate(job.job_id)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                >
                  <Pencil size={16} />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job.job_id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
