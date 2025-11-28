'use client'; // ✅ Agregar esto al inicio

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, getUserData, clearAuthData, setAuthData } from '../utils/auth';
import { API_ENDPOINTS } from '../utils/constants';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getAuthToken();
      const userData = getUserData();

      if (token && userData) {
        // Validar token con el backend
        try {
          const response = await axios.post(API_ENDPOINTS.VALIDATE_TOKEN, {
            token
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.isValid) {
            setUser(userData);
          } else {
            clearAuthData();
          }
        } catch (error) {
          console.error('Error validando token:', error);
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Error en checkAuth:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, identityNumber) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        identityNumber
      });

      const { token, user: userData } = response.data;
      
      setAuthData(token, userData);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el login' 
      };
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};