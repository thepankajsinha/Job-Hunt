import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useJob } from "../context/JobContext";
import { useEffect } from "react";

const HomePage = () => {
    const { jobs, loading, getAllJobs } = useJob();
  
    useEffect(() => {
      getAllJobs();
    }, []);

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
          <Link to="/jobs">
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
              Browse All Jobs
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
