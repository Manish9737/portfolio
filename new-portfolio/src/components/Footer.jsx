import { Facebook, Instagram, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/apis";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserProfile();

        if (res.status !== 200) {
          alert("SomeThing went wrong !!")
          return;
        }
        setSocialLinks(res.data.socialLinks)
      } catch (error) {
        alert("Error in fetching data");
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

  const validLinks = Object.entries(socialLinks).filter(
    ([, url]) => {
      if (typeof url !== "string") return false;
      const clean = url.trim().toLowerCase();
      return clean !== "" && clean !== "null" && clean !== "undefined";
    }
  );

  return (
    <footer className="bg-white/5 backdrop-blur text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Designed & Developed by Manishkumar Kumavat</span>. All rights reserved.
        </p>

        <div className="flex space-x-4">
          {validLinks.map(([platform, url], idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {socialIcons[platform.toLowerCase()] || null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;