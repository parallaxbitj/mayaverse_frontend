import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

/**
 * MAYAVERSE - Root Application Component
 * 
 * This component wraps the entire application with necessary providers:
 * - BrowserRouter: Enables routing throughout the app
 * - AuthProvider: Provides authentication context to all components
 * 
 * The actual route definitions are in AppRoutes component for better organization.
 */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;