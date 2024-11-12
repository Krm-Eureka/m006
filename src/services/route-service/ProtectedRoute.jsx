import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ requiredRoles }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/auth/Unauthorized" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  requiredRoles: PropTypes.arrayOf(PropTypes.string), 
};

export default ProtectedRoute;
