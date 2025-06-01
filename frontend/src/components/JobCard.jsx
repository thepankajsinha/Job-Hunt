import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(job.posted_at));

  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
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
              Posted on: {formattedDate}
            </p>
          </div>
        </div>
        <div>
          <Link
            to={`/jobs/${job.job_id}`}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
