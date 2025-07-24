import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ allowRole }) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("data") || "{}");
  const role = userData.role;

  // If user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match
  if (allowRole && role !== allowRole) {
    toast.error("You are not allowed to access this page");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
