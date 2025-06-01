import React, { useEffect, useState } from "react";
import { useApplication } from "../context/ApplicationContext";

const statusOptions = ["Pending", "Reviewed", "Accepted", "Rejected"];

export default function ApplicationPage() {
  const {
    fetchApplicants,
    applicants,
    loading,
    error,
    updateApplicationStatus,
    setError,
  } = useApplication();

  const [statusUpdating, setStatusUpdating] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setStatusUpdating(applicationId);
      await updateApplicationStatus(applicationId, newStatus);
      await fetchApplicants(); // refresh data after update
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setStatusUpdating(null);
    }
  };

  if (loading && !statusUpdating) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
        Loading applicants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-red-500 rounded-xl shadow-md text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!applicants.length) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-xl shadow-md text-center text-gray-700">
        No applicants found for your jobs.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Applicants for Your Jobs
      </h1>

      <div className="space-y-6">
        {applicants.map((app, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-black">
                  {app.job_title}
                </h2>
                <p className="text-gray-700 text-sm">
                  Applicant: {app.first_name} {app.last_name}
                </p>
                <p className="text-gray-700 text-sm">Email: {app.email}</p>
                <p className="text-gray-700 text-sm">
                  Resume:{" "}
                  <a
                    href={app.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-2 w-40">
                <label
                  htmlFor={`status-select-${index}`}
                  className="text-sm font-medium text-gray-600"
                >
                  Update Status
                </label>
                <select
                  id={`status-select-${index}`}
                  value={app.status || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(app.application_id, e.target.value)
                  }
                  disabled={statusUpdating === app.application_id}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {statusUpdating === app.application_id && (
                  <p className="text-xs text-gray-500 mt-1">
                    Updating status...
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
