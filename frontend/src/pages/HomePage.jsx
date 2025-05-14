import React, { useState } from "react";
import JobCard from "../components/JobCard";

export default function HomePage() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
  });

  const jobs = [
    {
      id: 1,
      title: "Software Engineer (Android), Libraries",
      company: "Segment",
      location: "London, UK",
      posted: "11 hours ago",
      salary: "$35k - $45k",
      logo: "https://logo.clearbit.com/segment.com",
      type: "Full Time",
      visibility: "Private",
      urgent: true,
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "TechNova",
      location: "Delhi",
      posted: "2 days ago",
      salary: "$20k - $30k",
      logo: "https://logo.clearbit.com/technova.com",
      type: "Part Time",
      visibility: "Public",
      urgent: false,
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.type === "" || job.type === filters.type)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-lg">
          Search jobs that match your skills and passion
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-6xl mx-auto px-4 mt-[-40px] z-10 relative">
        <div className="bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by keyword"
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
          <select
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-gray-500 text-center">
            No jobs match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
