import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUserProfile, updateUserProfile } from "../api/apis";
import { Pencil, Linkedin, Facebook, Twitter, Github, Globe, MapPin, Instagram } from "lucide-react";
import plcaeHolder from "../assets/avatar.jpg"
import EditProfileModal from "./../components/EditProfileModal";

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getUserProfile();
        if (res.status === 200) setUserData(res.data);
      } catch {
        Swal.fire("Error", "Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const res = await updateUserProfile(formData, true);
      if (res.status === 200) {
        setUserData(res.data.updatedUser);
        Swal.fire("Success", "Profile image updated", "success");
      }
    } catch {
      Swal.fire("Error", "Failed to update profile image", "error");
    }
  };

  const handleSaveProfile = async (formDataObj) => {
    try {
      const formData = new FormData();
      Object.keys(formDataObj).forEach((key) => {
        if (["skills", "socialLinks", "addresses"].includes(key)) {
          formData.append(key, JSON.stringify(formDataObj[key]));
        } else if (formDataObj[key] !== null) {
          formData.append(key, formDataObj[key]);
        }
      });
      const res = await updateUserProfile(formData, true);
      if (res.status === 200) {
        setUserData(res.data.updatedUser);
        setShowEditModal(false);
        Swal.fire("Success", "Profile updated successfully!", "success");
      }
    } catch {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (!userData) return null;

  const socialIcons = {
    linkedin: <Linkedin />,
    facebook: <Facebook />,
    twitter: <Twitter />,
    github: <Github />,
    instagram: <Instagram />, 
    website: <Globe />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center relative">
          <div className="relative group">
            <img
              src={
                userData.profileImage
                  ? `http://localhost:5000${userData.profileImage}`
                  : plcaeHolder
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
            />
            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full border border-white cursor-pointer hover:bg-gray-700"
              title="Change profile picture"
            >
              <Pencil size={16} />
            </label>
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">{userData.fullName}</h1>
          <p className="text-indigo-300">@{userData.username}</p>
          {userData.designation && <p className="text-lg text-gray-300">{userData.designation}</p>}
          {userData.study && <p className="text-sm text-gray-400 italic">{userData.study}</p>}
          {userData.experience && <p className="text-sm text-gray-400">{userData.experience} experience</p>}
          <p className="text-gray-300 mt-2 text-center max-w-3xl">{userData.bio}</p>

          {userData.resume && (
            <a
              href={`http://localhost:5000${userData.resume}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-sm text-blue-400 underline"
            >
              View Resume
            </a>
          )}

          {/* Social Links */}
          <div className="flex gap-3 mt-4">
            {Object.entries(userData.socialLinks || {})
              .filter(([platform, url]) => {
                const isValidUrl =
                  url &&
                  typeof url === "string" &&
                  url.trim() !== "" &&
                  url.trim().toLowerCase() !== "null" &&
                  url.trim().toLowerCase() !== "undefined";
                return isValidUrl && socialIcons[platform.toLowerCase()];
              })
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-colors"
                >
                  {socialIcons[platform.toLowerCase()]}
                </a>
              ))}
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
          >
            Edit Profile
          </button>
        </div>

        {/* Info Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Contact</h3>
            <p><span className="font-semibold">Email:</span> {userData.email}</p>
            <p><span className="font-semibold">Phone:</span> {userData.phone}</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Skills</h3>
            <p>{userData.skills.join(", ")}</p>
          </div>

          {/* Addresses */}
          <div className="md:col-span-3 mt-4">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Addresses</h3>
            {userData.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-800/50 rounded-lg mb-4 shadow flex items-start gap-3"
              >
                <MapPin size={20} className="text-indigo-400 mt-1" />
                <div>
                  <p className="font-semibold">{addr.type}</p>
                  <p>{addr.line1}, {addr.line2}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProfileModal
          user={userData}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default AdminProfile;
