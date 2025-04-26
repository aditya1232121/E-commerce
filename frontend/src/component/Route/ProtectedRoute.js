import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children, isAdmin = false }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  // If user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated and trying to access the admin route
  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  // Avoid redirecting if already on /admin/dashboard and the user is an admin
  if (user?.role === 'admin' && isAdmin && window.location.pathname !== '/admin/dashboard') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If all checks pass, render the children (protected component)
  return children;
}
