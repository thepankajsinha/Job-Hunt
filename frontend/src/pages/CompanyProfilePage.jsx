import React, { useState, useEffect } from "react";
import { useCompany } from "../context/CompanyContext";

export default function CompanyProfilePage() {
  const { employer, updateEmployer } = useCompany();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");

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
    await updateEmployer({
      name,
      description,
      website_url: websiteUrl,
      logo_url: logoUrl,
      industry,
    });
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
        <div>
          <label className="block text-black mb-1 font-semibold">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-black mb-1 font-semibold">
            Description
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md resize-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1 font-semibold">
            Website URL
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://company.com"
            className="w-full border border-black px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-black mb-1 font-semibold">
            Logo URL
          </label>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://logo.com"
            className="w-full border border-black px-4 py-2 rounded-md"
          />
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Company Logo"
              className="w-20 h-20 object-contain mt-2 border border-black rounded-md"
            />
          )}
        </div>

        <div>
          <label className="block text-black mb-1 font-semibold">
            Industry
          </label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
