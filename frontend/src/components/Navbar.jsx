import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#f6f9fc] px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-black font-semibold text-xl">Superio</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <div className="group relative">
          <button className="text-blue-600">Home</button>
        </div>
        <div className="group relative">
          <button className="text-black hover:text-blue-600">Find Jobs</button>
        </div>
        <div className="group relative">
          <button className="text-black hover:text-blue-600">Employers</button>
        </div>
        <div className="group relative">
          <button className="text-black hover:text-blue-600">Candidates</button>
        </div>
        <div className="group relative">
          <button className="text-black hover:text-blue-600">Blog</button>
        </div>
        <div className="group relative">
          <button className="text-black hover:text-blue-600">Pages</button>
        </div>
        <a href="#" className="text-blue-600 hover:underline">
          Upload your CV
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-md">
          Login / Register
        </button>
        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
          Job Post
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
