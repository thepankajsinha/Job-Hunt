import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Logo / Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resume<span className="text-blue-600">Analyser</span>
        </h2>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="#"
            className="hover:text-blue-600 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="mailto:info@resumeanalyser.com"
            className="hover:text-blue-600 transition"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>

        {/* Links */}
        <div className="flex justify-center flex-wrap gap-6 text-sm mb-6">
          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Resume Analyser. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
