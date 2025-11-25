import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
