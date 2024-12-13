import React from "react";
import { FaDownload } from "react-icons/fa";


const DownloadResume = () => {
  return (
    <a
      href="/materials/Resume.pdf" // Update with the actual file path or URL for your resume
      download
      className="btn btn-download"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <FaDownload /> Download Resume
    </a>
  );
};

export default DownloadResume;
