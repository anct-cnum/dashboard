import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const isAuthenticated = useSelector(state => state.authentication?.isAuthenticated);
  const isLoggingOut = useSelector(state => state.authentication?.isLoggingOut);
  if (isLoggingOut) {
    return null;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
