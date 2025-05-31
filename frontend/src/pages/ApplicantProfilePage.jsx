import React, { useState, useEffect } from "react";
import { useApplicant } from "../context/ApplicantContext";

export default function ApplicantProfilePage() {
  const { applicant, initialLoading, updating, updateApplicantProfile } =
    useApplicant();

  const [editMode, setEditMode] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileSummary, setProfileSummary] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [skills, setSkills] = useState("");

  // Initialize form only when NOT in edit mode (to avoid overwriting input)
  useEffect(() => {
    if (applicant && !editMode) {
      setFirstName(applicant.first_name || "");
      setLastName(applicant.last_name || "");
      setProfileSummary(applicant.profile_summary || "");
      setResumeUrl(applicant.resume_url || "");
      setSkills(applicant.skills || "");
    }
  }, [applicant, editMode]);

  const handleSave = async (e) => {
    e.preventDefault();
    updateApplicantProfile(
      firstName,
      lastName,
      profileSummary,
      resumeUrl,
      skills,
    );
  };
  

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
        Loading...
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
        No applicant data found.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Applicant Profile
      </h1>

      <form onSubmit={handleSave} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            First Name
          </label>
          {editMode ? (
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              {firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Last Name
          </label>
          {editMode ? (
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              {lastName}
            </p>
          )}
        </div>

        {/* Profile Summary */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Profile Summary
          </label>
          {editMode ? (
            <textarea
              required
              rows={4}
              value={profileSummary}
              onChange={(e) => setProfileSummary(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none resize-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md whitespace-pre-wrap">
              {profileSummary || "No profile summary"}
            </p>
          )}
        </div>

        {/* Resume URL */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Resume URL
          </label>
          {editMode ? (
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://yourresume.com"
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-black block px-4 py-2 border border-black rounded-md"
            >
              View Resume
            </a>
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              No resume uploaded
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-black mb-1 font-semibold">Skills</label>
          {editMode ? (
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Comma separated skills"
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              {skills || "No skills listed"}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          {editMode ? (
            <>
              <button
                type="submit"
                disabled={updating}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 mr-4"
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
