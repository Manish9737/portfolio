import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { createVisit } from "../api/apis";

const UserLayout = () => {
  useEffect(() => {
    const createVisitor = async () => {
      try {
        await createVisit();
      } catch (error) {
        console.error("Error creating visit:", error);
      }
    }
    createVisitor()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      <Navbar />
      <main className="px-4 py-6 md:px-12 lg:px-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
