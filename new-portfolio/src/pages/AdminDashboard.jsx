import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  FolderKanban,
  Code,
  FileText,
  Gauge,
} from "lucide-react";
import { getBlogs, getProjects, getTechStack, getVisitCount } from "../api/apis";

const AdminDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [visits, setVisits] = useState(0);
  const [projects, setProjects] = useState(0);
  const [skills, setSkills] = useState(0);
  const [blogs, setBlogs] = useState(0);

  // API calls
  const fetchUserCounts = async () => {
    try {
      const res = await getVisitCount();
      if (res.status === 200) {
        setVisits(res.data.length || 0);
      }
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      if (res.status === 200) {
        setProjects(res.data.projects.length || 0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await getTechStack();
      if (res.status === 200) {
        setSkills(res.data.length || 0);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      if (res.status === 200) {
        setBlogs(res.data.length || 0);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    // Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Fetch data
    fetchUserCounts();
    fetchProjects();
    fetchSkills();
    fetchBlogs();
  }, []);

  // Dynamic stats
  const stats = [
    { title: "Total Users", value: visits, icon: <Users size={20} />, color: "from-sky-500 to-sky-700" },
    { title: "Projects", value: projects, icon: <FolderKanban size={20} />, color: "from-indigo-500 to-indigo-700" },
    { title: "Skills", value: skills, icon: <Code size={20} />, color: "from-green-500 to-green-700" },
    { title: "Blogs", value: blogs, icon: <FileText size={20} />, color: "from-pink-500 to-pink-700" },
  ];

  const features = [
    { title: "Users Monitoring", desc: "View and manage all visitors.", path: "/admin/users", icon: <Users size={22} /> },
    { title: "Contact Requests", desc: "See all contact form submissions.", path: "/admin/contacts", icon: <Mail size={22} /> },
    { title: "Projects Management", desc: "Manage portfolio projects.", path: "/admin/projects", icon: <FolderKanban size={22} /> },
    { title: "Skillset Manager", desc: "Manage technical skills.", path: "/admin/skills", icon: <Code size={22} /> },
    { title: "Blog Management", desc: "Write and edit blog posts.", path: "/admin/blogs", icon: <FileText size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold mb-1">{greeting}, Admin 👋</h1>
        <p className="text-gray-400">Here's what's happening in your portfolio today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-5 bg-gradient-to-br ${stat.color} shadow-lg flex flex-col gap-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-white/80">{stat.title}</span>
              <div className="bg-white/20 p-2 rounded-lg">{stat.icon}</div>
            </div>
            <span className="text-3xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <Link
              to={f.path}
              key={idx}
              className="bg-white/10 p-6 rounded-xl shadow hover:bg-white/20 transition flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 text-indigo-300">
                {f.icon}
                <span className="font-semibold">{f.title}</span>
              </div>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
