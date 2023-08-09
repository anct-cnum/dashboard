import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  if (!localStorage.getItem('logoutAction')) { // Pour éviter le double navigate /login lors de la déconnexion
    return localStorage.getItem('user') && localStorage.getItem('user') !== '{}' ? <Outlet /> : <Navigate to="/login" />;
  }
  return;
}
