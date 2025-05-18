import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Jobseeker Dashboard
        </h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <section className="bg-white p-4 rounded-lg shadow-md col-span-1">
          <h2 className="text-xl font-semibold mb-2">Profile Summary</h2>
          <p className="text-gray-600">Name: John Doe</p>
          <p className="text-gray-600">Email: john.doe@example.com</p>
          <p className="text-gray-600">Location: Delhi, India</p>
        </section>

        {/* Recent Applications */}
        <section className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="font-medium">Software Developer at Google</p>
              <p className="text-sm text-gray-500">Applied on: May 10, 2025</p>
            </li>
            <li className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="font-medium">Frontend Engineer at Amazon</p>
              <p className="text-sm text-gray-500">Applied on: May 8, 2025</p>
            </li>
          </ul>
        </section>

        {/* Job Recommendations */}
        <section className="bg-white p-4 rounded-lg shadow-md col-span-3">
          <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold">Backend Developer at Microsoft</h3>
              <p className="text-sm text-gray-600">Location: Remote</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold">Full Stack Engineer at Adobe</h3>
              <p className="text-sm text-gray-600">Location: Bangalore</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
