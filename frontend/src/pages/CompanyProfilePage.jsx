import React, { useState, useEffect } from "react";
import { useCompany } from "../context/CompanyContext";

export default function CompanyProfilePage() {
  const { employer, updateEmployer } = useCompany();

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");

  // Initialize form values when not editing
  useEffect(() => {
    if (employer) {
      setName(employer.name || "");
      setDescription(employer.description || "");
      setWebsiteUrl(employer.website_url || "");
      setLogoUrl(employer.logo_url || "");
      setIndustry(employer.industry || "");
    }
  }, [employer]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateEmployer({
        name,
        description,
        website_url: websiteUrl,
        logo_url: logoUrl,
        industry,
      });
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!employer) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
        No company data found.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Company Profile
      </h1>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-black mb-1 font-semibold">Name</label>
          {editMode ? (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">{name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Description
          </label>
          {editMode ? (
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md resize-none focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md whitespace-pre-wrap">
              {description || "No description"}
            </p>
          )}
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Website URL
          </label>
          {editMode ? (
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://company.com"
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-black block px-4 py-2 border border-black rounded-md"
            >
              Visit Website
            </a>
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              No website provided
            </p>
          )}
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Logo URL
          </label>
          {editMode ? (
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://logo.com"
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt="Company Logo"
              className="w-20 h-20 object-contain border border-black rounded-md"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              No logo uploaded
            </p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label className="block text-black mb-1 font-semibold">
            Industry
          </label>
          {editMode ? (
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
            />
          ) : (
            <p className="px-4 py-2 border border-black rounded-md">
              {industry || "No industry listed"}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6">
          {editMode ? (
            <>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 mr-4"
              >
                Save
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
