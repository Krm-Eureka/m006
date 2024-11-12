import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ requiredRoles = [] }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  console.log(requiredRoles);
  console.log(userRole);
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
