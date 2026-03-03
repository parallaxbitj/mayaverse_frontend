import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * MAYAVERSE - useAuth Hook
 * 
 * Custom hook to access authentication context.
 * This hook provides easy access to auth state and functions.
 * 
 * Usage:
 * const { user, login, logout, isAuthenticated, isAdmin } = useAuth();
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;