import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/auth/Login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;