import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {  
  const isAuthenticated = localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {  
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
