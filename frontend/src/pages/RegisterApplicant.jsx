import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterApplicant() {

  const {registerApplicant} = useAuth();
  const navigate = useNavigate();

  // Applicant table fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileSummary, setProfileSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

    // User table fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await registerApplicant({
      firstName,
      lastName,
      profileSummary,
      skills,
      resumeUrl,
      email,
      password
    });
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Register as Applicant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Applicant Table Inputs */}
        <div>
          <label className="block text-black mb-1">First Name</label>
          <input
            type="text"
            required
            placeholder="e.g., John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Last Name</label>
          <input
            type="text"
            required
            placeholder="e.g., Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Profile Summary</label>
          <textarea
            required
            placeholder="Write a brief summary about your experience, goals, and skills"
            value={profileSummary}
            onChange={(e) => setProfileSummary(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-black mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            required
            placeholder="e.g., JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Resume URL (Google Drive link)</label>
          <input
            type="url"
            required
            placeholder="https://drive.google.com/your-resume-link"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

          {/* User Table Inputs */}
        <div>
          <label className="block text-black mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Confirm Password</label>
          <input
            type="text"
            required
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Register
        </button>
      </form>
    </div>
  );
}
