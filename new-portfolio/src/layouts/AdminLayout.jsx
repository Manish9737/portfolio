import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 bg-slate-900 z-10 mb-6 flex justify-between items-center border-b border-slate-700 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-semibold">Administration</h1>
          </div>

          <Link
            to="/"
            className="text-sm text-indigo-400 hover:underline"
          >
            Back to Portfolio
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
