import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CreateCompanyPage() {
  const { user } = useAuth();

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

    // State to track if the user is editing an existing company
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);


  // Fetch existing employer details (if any)
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get("/employer/me");
        const data = res.data.employer;
        setCompanyName(data.company_name);
        setCompanyDescription(data.company_description);
        setCompanyWebsite(data.company_website);
        setCompanyLogo(data.company_logo);
        setIsEditing(true);
      } catch (err) {
        console.log("No existing company found. Ready to create.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const company = {
      company_name: companyName,
      company_description: companyDescription,
      company_website: companyWebsite,
      company_logo: companyLogo,
    };

    try {
      if (isEditing) {
        const res = await api.put("/employer/update", company);
        alert(res.data.message);
      } else {
        const res = await api.post("/employer/create", company);
        alert(res.data.message);
        setIsEditing(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        {isEditing ? "Update Your Company" : "Create Your Company"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          placeholder="Company Description"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Company Website URL"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Company Logo URL"
          value={companyLogo}
          onChange={(e) => setCompanyLogo(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {isEditing ? "Update Company" : "Create Company"}
        </button>
      </form>



      {isEditing && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Your Company Info:</h2>
          <p>
            <strong>Name:</strong> {companyName}
          </p>
          <p>
            <strong>Description:</strong> {companyDescription}
          </p>
          <p>
            <strong>Website:</strong>
            <a
              href={companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {companyWebsite}
            </a>
          </p>

          
          {companyLogo && (
            <img src={companyLogo} alt="Logo" className="h-16 mt-2" />
          )}
        </div>
      )}
    </div>
  );
}
