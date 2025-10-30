import React from "react";
import { Brain, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ChooseModePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-5xl w-full text-center">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Choose Your <span className="text-blue-600">Analysis Mode</span>
        </h1>
        <p className="text-gray-600 mb-12">
          Select the type of analysis you’d like to perform with your resume.
        </p>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume Analysis Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <FileText className="text-blue-600 mb-4" size={56} />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Resume Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your resume PDF to receive AI-driven insights and
                improvement suggestions.
              </p>

              <Link to="/resume/analyse">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Go to Analysis
                </button>
              </Link>
            </div>
          </div>

          {/* Job Matching Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <Brain className="text-blue-600 mb-4" size={56} />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Job Matching
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your resume and either a job description or target
                profile to see how well you match.
              </p>

              <Link to="/resume/job-match">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Go to Job Match
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseModePage;
