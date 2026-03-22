import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { KALIKOT_TOKEN_KEY } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(KALIKOT_TOKEN_KEY));
  const [booting, setBooting] = useState(true);

  const saveSession = (payload) => {
    localStorage.setItem(KALIKOT_TOKEN_KEY, payload.token);
    setToken(payload.token);
    setUser(payload.user);
  };

  const clearSession = () => {
    localStorage.removeItem(KALIKOT_TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    saveSession(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    saveSession(data);
    return data;
  };

  const logout = () => {
    clearSession();
  };

  const refreshProfile = async () => {
    if (!token) {
      setBooting(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch (error) {
      clearSession();
    } finally {
      setBooting(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      booting,
      login,
      register,
      logout,
      refreshProfile,
      isAuthenticated: Boolean(token && user),
    }),
    [user, token, booting],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
