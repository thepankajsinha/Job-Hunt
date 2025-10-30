import React from "react";
import { ArrowRight } from "lucide-react"; // ← Import Lucide icon
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-24 flex items-center justify-center text-center">
      <div className="max-w-5xl px-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Unlock Your Career Potential
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold text-blue-600 mt-2">
          with AI-Powered Resume Analysis
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600">
          Instantly analyze your resume and get actionable feedback powered by
          advanced AI. Improve your chances of landing your dream job with
          smart, data-driven insights.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link to={"/register"}>
            {" "}
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              Get Started
              <ArrowRight size={22} className="ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
