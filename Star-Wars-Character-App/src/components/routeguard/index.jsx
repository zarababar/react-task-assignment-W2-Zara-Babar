import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const RouteGuard = () => {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  // Handle redirection based on authentication status
  if (location.pathname === '/' && token) {
    // If user is authenticated and trying to access login page
    return <Navigate to="/listings" />;
  } else if (location.pathname !== '/' && !token) {
    // If user is not authenticated and trying to access protected pages
    return <Navigate to="/" />;
  }

  // If none of the conditions match, render the current route
  return <Outlet />;
};

export default RouteGuard;
