import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Code,
  Mail,
  FileText,
  Users,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Profile", path: "/admin/profile", icon: <User size={18} /> },
    { label: "Projects", path: "/admin/projects", icon: <FolderKanban size={18} /> },
    { label: "Skills", path: "/admin/skills", icon: <Code size={18} /> },
    { label: "Contacts", path: "/admin/contacts", icon: <Mail size={18} /> },
    { label: "Blogs", path: "/admin/blogs", icon: <FileText size={18} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
  ];

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 w-64 bg-slate-800 p-6 space-y-4 shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-indigo-400">Portfolio Admin</h2>
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Nav Links */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition
              ${location.pathname === item.path ? "bg-indigo-600 text-white" : "text-gray-300"}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
