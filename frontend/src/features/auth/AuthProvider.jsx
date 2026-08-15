import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAdmin,
} from './authSlice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  const value = { user, isAuthenticated, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
}
