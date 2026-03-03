import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/config';

/**
 * MAYAVERSE - Protected Route Component
 * 
 * This component protects routes that require authentication.
 * If user is not logged in, they are redirected to login page.
 * 
 * Usage:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/user/profile" element={<UserProfile />} />
 * </Route>
 */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;