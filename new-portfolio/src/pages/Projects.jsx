import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../api/apis";
import placeholder from "../assets/placeHolder.png"

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getProjects();
        if (res.status !== 200) {
          alert("Something went wrong while fetching skills!");
          setLoading(false);
          return;
        }
        const filteredProjects = res.data.projects.filter((project) => project.isVisible === true && !project.isFeatured);
        setProjects(filteredProjects);
      } catch (error) {
        alert("Something went wrong!");
        console.error("Error in fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-12 tracking-wide">
        My Projects
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl p-4 flex flex-col justify-between"
            >
              <img
                src={
                  project.imageUrl
                    ? `${import.meta.env.VITE_API_BASE_URL}${project.imageUrl}`
                    : placeholder
                }
                alt={project.title}
                className="w-full h-52 sm:h-56 md:h-60 lg:h-48 xl:h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white text-xl font-semibold mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
                >
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Projects;