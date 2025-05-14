import React, { useState } from "react";
import { Bookmark, BriefcaseBusiness, LogOut, UserPen, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function JobSeekerDashboard() {

  const {logout, user} = useAuth();
  const navigate = useNavigate();  

  const baseButtonClass = "flex w-full text-left px-4 py-2 rounded-lg transition items-center gap-2";


  const [activeSection, setActiveSection] = useState("profile-overview");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    skills: "JavaScript, React, Node.js",
    resume: "https://example.com/resume.pdf",
    experience: "2 years at TechNova as Frontend Developer",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "applied":
        return (
          <p className="text-gray-600">You have not applied to any jobs yet.</p>

        );

      case "bookmarks":
        return (
          <p className="text-gray-600">You haven't bookmarked any jobs.</p>

        );

      case "edit-profile":
        return (
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={profileData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume Link
              </label>
              <input
                type="url"
                name="resume"
                value={profileData.resume}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <textarea
                name="experience"
                value={profileData.experience}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        );

      case "profile-overview":
        return (
          <div className="text-gray-700 space-y-4">
            <div>
              <span className="font-medium">Name:</span> {profileData.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {profileData.email}
            </div>
            <div>
              <span className="font-medium">Skills:</span> {profileData.skills}
            </div>
            <div>
              <span className="font-medium">Resume:</span>{" "}
              <a
                href={profileData.resume}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                {profileData.resume}
              </a>
            </div>
            <div>
              <span className="font-medium">Experience:</span>{" "}
              {profileData.experience}
            </div>
          </div>
        );

      case "logout":
        return <p className="text-red-500">You have been logged out.</p>;

      default:
        return null;
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 ">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">{user?.name}</h1>
        <nav className="space-y-4 text-gray-700 font-medium">
          <button
            onClick={() => setActiveSection("profile-overview")}
            className={`${baseButtonClass} ${
              activeSection === "profile-overview"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <UserRound /> My Profile
          </button>

          <button
            onClick={() => setActiveSection("edit-profile")}
            className={`${baseButtonClass} ${
              activeSection === "edit-profile"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <UserPen /> Edit Profile
          </button>
          <button
            onClick={() => setActiveSection("applied")}
            className={`${baseButtonClass} ${
              activeSection === "applied"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <BriefcaseBusiness /> Applied Jobs
          </button>
          <button
            onClick={() => setActiveSection("bookmarks")}
            className={`${baseButtonClass} ${
              activeSection === "bookmarks"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <Bookmark /> Bookmarked Jobs
          </button>
          <button
            onClick={() => {setActiveSection("logout"); logout(); navigate("/login")}}
            className={`${baseButtonClass} ${
              activeSection === "logout"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <LogOut /> Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
          {activeSection.replace("-", " ")}
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow">{renderSection()}</div>
      </main>
    </div>
  );
}
