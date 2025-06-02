import React, { useEffect } from "react";
import { useApplication } from "../context/ApplicationContext";

const statusOptions = ["Pending", "Hired", "Rejected"];

export default function ApplicationPage() {
  const { fetchApplicants, applicants, updateApplicationStatus } =
    useApplication();

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (!applicants.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600 text-lg">
        No applicants found for your jobs.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-black">
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
                <h2 className="text-xl font-semibold text-black">
                  {app.job_title}
                </h2>
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <p>
                    <span className="font-medium">Applicant:</span>{" "}
                    {app.first_name} {app.last_name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {app.email}
                  </p>
                  <p>
                    <span className="font-medium">Resume:</span>{" "}
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
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-48">
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
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
