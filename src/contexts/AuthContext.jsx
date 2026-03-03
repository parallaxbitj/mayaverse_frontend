import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';
import { USER_DATA_KEY, AUTH_TOKEN_KEY } from '../constants/config';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.get(USER_DATA_KEY);
    const token = storage.get(AUTH_TOKEN_KEY);
    if (storedUser && token) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    storage.set(USER_DATA_KEY, userData);
    storage.set(AUTH_TOKEN_KEY, 'mock-jwt-token');
    setUser(userData);
  };

  const logout = () => {
    storage.remove(USER_DATA_KEY);
    storage.remove(AUTH_TOKEN_KEY);
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    storage.set(USER_DATA_KEY, updatedUser);
    setUser(updatedUser);
  };

  const isAuthenticated = () => user !== null;

  const hasRegisteredForEvent = (eventId) =>
    user?.registeredEvents?.includes(eventId) || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated, hasRegisteredForEvent, loading }}>
      {children}
    </AuthContext.Provider>
  );
};