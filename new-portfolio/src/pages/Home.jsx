import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profilePic from "../assets/profile.jpg";
import { useEffect, useState } from "react";
import placeHolder from "../assets/placeHolder.png";
import { getTechStack, getBlogs, getProjects } from "../api/apis";

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoadingSkills(true);
      try {
        const res = await getTechStack();
        if (res.status === 200) setSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoadingSkills(false);
      }
    };

    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const res = await getProjects();
        if (res.status === 200 && Array.isArray(res.data.projects)) {
          const featured = res.data.projects.filter(
            (p) => p.isFeatured === true && p.isVisible === true
          );
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const res = await getBlogs();
        setBlogs(res.data);
        if (res.status === 200 && Array.isArray(res.data?.blogs)) {
          console.log(res.data)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchSkills();
    fetchProjects();
    fetchBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 sm:px-8 md:px-16 lg:px-24 py-10"
    >
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-sky-400 via-white to-pink-300 text-transparent bg-clip-text">
          Hi, I’m Manishkumar Kumavat
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Full Stack Developer (MERN) | Passionate about building modern web apps with clean UI and optimized performance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/projects" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition">
            View Projects
          </Link>
          <Link to="/contact" className="px-6 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition">
            Contact Me
          </Link>
        </div>
      </section>

      {/* About Me */}
      <motion.section
        className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profilePic}
            alt="Manishkumar Kumavat"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 object-cover"
          />
          <p className="text-gray-300 text-sm sm:text-base text-left">
            I’m a <strong className="text-white">Full Stack Developer</strong> with a focus on the MERN stack. With experience in frontend and backend development, I strive to build scalable, maintainable, and user-friendly web applications. I enjoy working with modern technologies like React, TailwindCSS, TypeScript, and Node.js. I’m also open to freelance, remote, and collaborative opportunities.
          </p>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
        {loadingSkills ? (
          <p className="text-center text-gray-400">Loading skills...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {skills.map((tech, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-transform hover:scale-105">
                <div className="w-10 h-10 flex items-center justify-center rounded bg-white/10 overflow-hidden">
                  <img
                    src={tech.icon ? `${import.meta.env.VITE_API_BASE_URL}${tech.icon}` : placeHolder}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-white">{tech.name}</p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        {loadingProjects ? (
          <p className="text-center text-gray-400">Loading featured projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project._id} className="bg-white/10 border border-white/10 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                <img src={project.imageUrl ? `${import.meta.env.VITE_API_BASE_URL}${project.imageUrl}` : placeHolder} alt={project.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <div className="h-full"></div>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                  <Link to={`/projects/${project._id}`} className="text-sky-400 text-sm hover:underline mt-2 inline-block">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Blogs */}
      <motion.section
        className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        {loadingBlogs ? (
          <p className="text-center text-gray-400">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white/10 border border-white/10 rounded-xl p-4 hover:scale-105 transition-transform">
                <img
                  src={blog.coverImage ? `${import.meta.env.VITE_API_BASE_URL}${blog.coverImage}` : placeHolder}
                  alt={blog.title}
                  className="w-full h-50 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-gray-400 text-sm">{blog.excerpt}</p>
                <Link to={`/blogs/${blog._id}`} className="text-sky-400 text-sm hover:underline mt-2 inline-block">Read More</Link>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
};

export default Home;
