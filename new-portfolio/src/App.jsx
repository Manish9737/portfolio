import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContactRequests from "./pages/ContactRequests";
import AdminProfile from "./pages/AdminProfile";
// import UsersPage from "./pages/UsersPage";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import NotFound from "./pages/NotFound";
import AdminProjects from "./pages/AdminProjects";
import AdminSkills from "./pages/AdminSkills";
import AdminBlogs from "./pages/AdminBlogs";
import SkillDetails from "./pages/SkillsDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import AdminUsers from "./pages/AdminUsers";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this site?";
    };

    const handleUnload = () => {
      const navType = performance.getEntriesByType("navigation")[0]?.type;
      if (navType !== "reload") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("userId");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="contacts" element={<ContactRequests />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />


        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/:id" element={<SkillDetails />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
