import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useJob } from "../context/JobContext";
import AllJobsPage from "./AllJobsPage";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-15">
          <h1 className="text-4xl font-bold text-black mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            Explore top opportunities and apply with one click.
          </p>
          <Link to="/all-jobs">
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
              Browse All Jobs
            </button>
          </Link>
        </div>
          <AllJobsPage/>
      </div>
    </div>
  );
};

export default HomePage;
