import { useState } from "react";

export default function RegisterEmployer() {
  // User table fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Employer table fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const password_hash = password;

    const userData = {
      email,
      password_hash,
      role: "employer",
    };

    const employerData = {
      name,
      description,
      website_url: websiteUrl,
      logo_url: logoUrl,
      industry,
    };

    console.log("User Table Data:", userData);
    console.log("Employer Table Data:", employerData);
    alert("Employer registered successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Register as Employer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Employer Table Inputs */}
        <div>
          <label className="block text-black mb-1">Company Name</label>
          <input
            type="text"
            required
            placeholder="e.g., TechCorp Pvt Ltd"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Company Description</label>
          <textarea
            required
            placeholder="Brief company description (max 255 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Website URL</label>
          <input
            type="url"
            required
            placeholder="https://yourcompany.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Logo URL</label>
          <input
            type="url"
            required
            placeholder="https://yourcompany.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Industry</label>
          <input
            type="text"
            required
            placeholder="e.g., Information Technology"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
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
