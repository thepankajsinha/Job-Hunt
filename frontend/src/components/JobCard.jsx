import { Bookmark, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <div className="flex items-start justify-between bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      {/* Logo */}
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={job.company}
          className="w-12 h-12 rounded-xl object-contain bg-gray-100"
        />
        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1 gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.posted}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="px-2 py-1 text-xs rounded-xl bg-blue-100 text-blue-600">
              {job.type}
            </span>
            <span className="px-2 py-1 text-xs rounded-xl bg-green-100 text-green-600">
              {job.visibility}
            </span>
            {job.urgent && (
              <span className="px-2 py-1 text-xs rounded-xl bg-yellow-100 text-yellow-600">
                Urgent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bookmark Icon */}
      <button className="text-gray-500 hover:text-gray-700">
        <Bookmark className="w-5 h-5" />
      </button>
    </div>
  );
}
