import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

const PrivateRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
