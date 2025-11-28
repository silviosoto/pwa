'use client';

import { withAuth } from '../../utils/withAuth';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import {
  AdminPanelSettings,
  BusinessCenter,
  Person,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const { user } = useAuth();

  const getRoleData = (role) => {
    switch (role) {
      case 'admin':
        return {
          color: 'error',
          icon: <AdminPanelSettings />,
          description: 'Acceso completo al sistema'
        };
      case 'manager':
        return {
          color: 'warning',
          icon: <BusinessCenter />,
          description: 'Gestión de usuarios y contenido'
        };
      case 'user':
        return {
          color: 'primary',
          icon: <Person />,
          description: 'Acceso básico a funciones'
        };
      default:
        return {
          color: 'default',
          icon: <Person />,
          description: 'Usuario'
        };
    }
  };

  const roleData = getRoleData(user?.role);

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <DashboardIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Panel principal de la aplicación
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card 
            elevation={2}
            sx={{ 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  {roleData.icon}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    ¡Bienvenido, {user?.name}!
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {roleData.description}
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label={user?.role.toUpperCase()} 
                color={roleData.color}
                sx={{ 
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontWeight: 'bold'
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.light', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <Person />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Perfil
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestiona tu información personal y configuración de cuenta
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.light', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <BusinessCenter />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Actividad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revisa tu historial y actividades recientes en el sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default withAuth(Dashboard);