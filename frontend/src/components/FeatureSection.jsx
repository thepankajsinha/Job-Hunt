import React from "react";
import { FileText, Brain, BarChart3, Sparkles, Cpu } from "lucide-react"; // icons

const features = [
  {
    icon: <FileText size={40} />,
    title: "Smart Resume Parsing",
    description:
      "Automatically extracts your skills, experience, and education details using advanced AI models.",
  },
  {
    icon: <Brain size={40} />,
    title: "AI-Powered Suggestions",
    description:
      "Get instant improvement tips based on job descriptions and recruiter preferences.",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Detailed Insights & Scoring",
    description:
      "Receive a resume score and detailed analytics to identify strengths and weak areas.",
  },
  {
    icon: <Sparkles size={40} />,
    title: "Tailored Optimization",
    description:
      "Customize your resume for specific roles and industries to stand out from the crowd.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge Divider */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full text-sm shadow-sm mb-10">
          <Cpu size={18} />
          <span>Powered by AI</span>
        </div>

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Powerful Features to
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-blue-600 mt-1">
          Elevate Your Resume
        </h3>

        {/* Features Grid */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
