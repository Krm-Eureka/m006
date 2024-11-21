import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ requiredRoles }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const userRoles = userRole ? userRole.split(",") : [];
  const navigate = useNavigate();

  console.log("User roles:", userRoles);

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expDate = payload.exp * 1000;
      return expDate > Date.now(); 
    } catch (error) {
      return false; 
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "authToken" || event.key === "userRole") {
        const newToken = localStorage.getItem("authToken");
        const newUserRole = localStorage.getItem("userRole");

        if (!newToken || !isTokenValid(newToken)) {
          console.log("Token invalid or missing, logging out...");
          navigate("/auth/login");
        }

        if (newUserRole !== userRole) {
          console.log("User role modified, logging out...");
          navigate("/auth/login");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, userRole]);

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/auth/login" />;
  }

  if (
    requiredRoles &&
    !requiredRoles.some((role) => userRoles.includes(role))
  ) {
    return <Navigate to="/auth/Unauthorized" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
