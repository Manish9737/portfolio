import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Instagram, Twitter, Facebook, Globe } from "lucide-react";
import placeHolder from "../assets/avatar.jpg";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/apis";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserProfile();

        if (res.status !== 200) {
          alert("SomeThing went wrong !!")
          return;
        }
        console.log(res.data)
        setUserData(res.data)
      } catch (error) {
        alert("Error in fetching user data");
        console.log(error.message)
      }
    }

    fetchUserData();
  }, [])

  const socialIcons = {
    linkedin: <Linkedin className="w-5 h-5 text-white" />,
    facebook: <Facebook className="w-5 h-5 text-white" />,
    twitter: <Twitter className="w-5 h-5 text-white" />,
    github: <Github className="w-5 h-5 text-white" />,
    instagram: <Instagram className="w-5 h-5 text-white" />,
    website: <Globe className="w-5 h-5 text-white" />
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${userData.resume}`, {
        method: "GET",
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf"; // Change name if needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
      {userData ? (<></>) : (<></>)}
      <div className="relative bg-gradient-to-br from-white/10 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-3xl opacity-20 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-10 mb-12">
          <img
            src={
              userData.profileImage
                ? `${import.meta.env.VITE_API_BASE_URL}${userData.profileImage}`
                : placeHolder
            }
            alt="Manishkumar Kumavat"
            loading="lazy"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 object-cover shadow-lg mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {
                userData.fullName
                  ? userData.fullName
                  : "No name"
              }</h1>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              {
                userData.designation
                  ? userData.designation
                  : "No designation"
              }
            </p>
            {userData.resume && (
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition duration-200 text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </button>
            )}

            <div className="flex justify-center sm:justify-start mt-4 space-x-3">
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
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition"
                  >
                    {socialIcons[platform.toLowerCase()]}
                  </a>
                ))}
            </div>


          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">About Me</h2>
            <p className="text-gray-300 leading-relaxed text-justify text-sm sm:text-base">
              {
                userData.bio
                  ? userData.bio
                  : "No bio provided."
              }
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Bio-Data</h2>
            <ul className="text-gray-300 space-y-3 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>
                  {userData.email
                    ? userData.email
                    : "Not Provided"
                  }
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>
                  {userData.number
                    ? `+91 ${userData.phone}`
                    : "Not Provided"
                  }
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {userData.addresses
                    ? `${userData.addresses?.[0]?.city},${userData.addresses?.[0]?.country}`
                    : "Not provided"
                  }
                </span>
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>
                  {userData.study
                    ? userData.study
                    : "Not Provided"
                  }
                </span>
              </li>
              <li>
                <strong>Experience: </strong>
                {userData.experience
                  ? userData.experience
                  : "Not Provided"
                }
              </li>
              <li>
                <strong>Skills:</strong> {" "}
                {userData.skills?.length ? userData.skills.join(", ") : (
                  <span className="text-gray-500">No skills listed</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
