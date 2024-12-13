import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="app-container">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
