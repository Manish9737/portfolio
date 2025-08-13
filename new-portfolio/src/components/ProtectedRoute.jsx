import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userId = localStorage.getItem("userId");

  // Only allow access if BOTH adminToken and userId exist
  const isAuthenticated = Boolean(adminToken && adminToken !== "null" && adminToken !== "undefined" &&
    userId && userId !== "null" && userId !== "undefined");

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
