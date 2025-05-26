import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const MyProfilePage = () => {
  const { user, loading, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
  };

  const handleUpdate = async () => {
      await updateProfile({ name, email, password });
      console.log(name, email, password);
      setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white shadow-lg border border-black rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-black mb-8 text-center">
          My Profile
        </h2>

        <div className="space-y-6 text-black">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-black rounded-md"
              />
            ) : (
              <div className="px-3 py-2 border border-black rounded-md mt-1">
                {user.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-black rounded-md"
              />
            ) : (
              <div className="px-3 py-2 border border-black rounded-md mt-1">
                {user.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {isEditing ? (
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-black rounded-md"
              />
            ) : (
              <div className="px-3 py-2 border border-black rounded-md mt-1">
                {"********"}
              </div>
            )}
          </div>

          {/* Role (non-editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="px-3 py-2 border border-black rounded-md mt-1 bg-gray-100 text-gray-800">
              {user.role}
            </div>
          </div>
        </div>


        <div className="mt-8 text-center">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
