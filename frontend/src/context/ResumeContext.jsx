import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [jobMatchResult, setJobMatchResult] = useState(null);

  // ✅ Analyze Resume (upload single resume file)
  const analyzeResume = async (file) => {
    if (!file) {
      toast.error("Please upload a resume file!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await api.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(data.suggestions);
      toast.success("Resume analyzed successfully!");
      return data.suggestions;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error analyzing resume");
      console.error("❌ analyzeResume Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Match Job (upload resume + job description text only)
  const matchJob = async (resumeFile, jobDescriptionText = "") => {
    if (!resumeFile) {
      toast.error("Please upload a resume file!");
      return;
    }

    if (!jobDescriptionText.trim()) {
      toast.error("Please provide a job description!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescriptionText", jobDescriptionText);

    try {
      const { data } = await api.post("/resume/job-match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setJobMatchResult(data.analysis);
      toast.success("Job match analysis completed!");
      return data.analysis;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error matching job");
      console.error("❌ matchJob Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        loading,
        analysisResult,
        jobMatchResult,
        analyzeResume,
        matchJob,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// ✅ Custom hook for easy use
export const useResume = () => useContext(ResumeContext);
