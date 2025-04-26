import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children, isAdmin = false }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    if (user?.role !== "admin") {
      // If not admin and trying to access admin route → send to account
      return <Navigate to="/account" replace />;
    }
  }

  return children;
}
