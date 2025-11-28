'use client'; // ✅ Agregar esto al inicio

import { useRouter } from 'next/navigation'; // ✅ Cambiar a next/navigation
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const withAuth = (WrappedComponent, allowedRoles = []) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.replace('/login');
          return;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
          router.replace('/dashboard');
        }
      }
    }, [loading, isAuthenticated, user, router]);

    if (loading || !isAuthenticated) {
      return <div>Cargando...</div>;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      return <div>No tienes permisos para acceder a esta página</div>;
    }

    return <WrappedComponent {...props} />;
  };
};