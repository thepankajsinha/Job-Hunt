import React, { useState } from "react";
import {
  Briefcase,
  User,
  FileText,
  PlusCircle,
  List,
  LogOut,
} from "lucide-react";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderContent = () => {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full">
        {activeTab === "profile" && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">Company Profile</h2>
            <p>
              <strong>Name:</strong> DevCraft Solutions
            </p>
            <p>
              <strong>Website:</strong> https://devcraft.com
            </p>
            <p>
              <strong>Industry:</strong> IT Services
            </p>
            <p>
              <strong>Description:</strong> We specialize in cutting-edge
              software products.
            </p>
          </div>
        )}
        {activeTab === "edit" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Edit Company Profile
            </h2>
            <form className="space-y-4">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Company Name"
              />
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Website"
              />
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Industry"
              />
              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Company Description"
              ></textarea>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </form>
          </div>
        )}
        {activeTab === "post" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Post a New Job</h2>
            <form className="space-y-4">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Job Title"
              />
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Location"
              />
              <select className="w-full border rounded-lg p-2">
                <option value="">Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
              </select>
              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Job Description"
              ></textarea>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Post Job
              </button>
            </form>
          </div>
        )}
        {activeTab === "postings" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Your Job Postings
            </h2>
            <ul className="space-y-2">
              <li className="bg-gray-50 p-4 rounded-xl shadow">
                Frontend Developer - Delhi
              </li>
              <li className="bg-gray-50 p-4 rounded-xl shadow">
                Backend Developer - Remote
              </li>
            </ul>
          </div>
        )}
        {activeTab === "applicants" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Applicants</h2>
            <ul className="space-y-2">
              <li className="bg-gray-50 p-4 rounded-xl shadow">
                <p>
                  <strong>Name:</strong> Rohit Sharma
                </p>
                <p>
                  <strong>Applied for:</strong> Frontend Developer
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-xl shadow">
                <p>
                  <strong>Name:</strong> Priya Mehra
                </p>
                <p>
                  <strong>Applied for:</strong> Backend Developer
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex p-4">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl rounded-2xl p-6 space-y-6 h-fit">
        <div className="space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> Company Profile
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FileText className="w-5 h-5" /> Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <PlusCircle className="w-5 h-5" /> Post Job
          </button>
          <button
            onClick={() => setActiveTab("postings")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <Briefcase className="w-5 h-5" /> Job Postings
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <List className="w-5 h-5" /> Applicants
          </button>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-4">{renderContent()}</div>
    </div>
  );
};

export default EmployerDashboard;
