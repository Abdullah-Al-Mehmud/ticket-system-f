import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
