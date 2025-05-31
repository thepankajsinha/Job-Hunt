import { useState } from "react";

export default function RegisterApplicant() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Collect data into an object (to send to backend or context)
    const formData = {
      fullName,
      email,
      password,
      resume,
    };

    console.log(formData);
    alert("Applicant registered successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Register as Applicant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-black mb-1">Upload Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Register
        </button>
      </form>
    </div>
  );
}
