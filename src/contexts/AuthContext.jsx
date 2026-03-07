import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';
import { USER_DATA_KEY, AUTH_TOKEN_KEY } from '../constants/config';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.get(USER_DATA_KEY);
    const storedToken = storage.get(AUTH_TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  /**
   * Call after successful login or OTP verification.
   * @param {object} userData  — user object from backend
   * @param {string} jwt       — real JWT from backend
   */
  const login = (userData, jwt) => {
    storage.set(USER_DATA_KEY, userData);
    storage.set(AUTH_TOKEN_KEY, jwt);
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    storage.remove(USER_DATA_KEY);
    storage.remove(AUTH_TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    storage.set(USER_DATA_KEY, updatedUser);
    setUser(updatedUser);
  };

  const isAuthenticated = () => user !== null && token !== null;

  const hasRegisteredForEvent = (eventId) =>
    user?.registeredEvents?.includes(eventId) || false;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, isAuthenticated, hasRegisteredForEvent, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};