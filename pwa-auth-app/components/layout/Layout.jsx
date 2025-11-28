'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  AccountCircle,
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  BusinessCenter as ManagerIcon,
  Person as UserIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <AdminIcon />;
      case 'manager': return <ManagerIcon />;
      case 'user': return <UserIcon />;
      default: return <UserIcon />;
    }
  };

  const navigationItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['admin', 'manager', 'user'] },
    { label: 'Admin', icon: <AdminIcon />, path: '/admin', roles: ['admin'] },
    { label: 'Manager', icon: <ManagerIcon />, path: '/manager', roles: ['admin', 'manager'] },
    { label: 'Usuario', icon: <UserIcon />, path: '/user', roles: ['admin', 'manager', 'user'] },
  ];

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <Box sx={{ 
      pb: 7,
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <AppBar 
        position="static" 
        elevation={1}
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          borderRadius: 0
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Mi App
          </Typography>
          
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user.name.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getRoleIcon(user.role)}
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.role}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 2, minHeight: 'calc(100vh - 128px)' }}>
        {children}
      </Box>

      {user && filteredNavigation.length > 0 && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            maxWidth: '428px',
            margin: '0 auto',
            borderTop: '1px solid',
            borderColor: 'divider'
          }} 
          elevation={3}
        >
          <BottomNavigation
            value={pathname}
            showLabels
            sx={{ backgroundColor: 'white' }}
          >
            {filteredNavigation.map((item) => (
              <BottomNavigationAction
                key={item.path}
                label={item.label}
                value={item.path}
                icon={item.icon}
                onClick={() => router.push(item.path)}
                sx={{
                  minWidth: 'auto',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  }
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};

export default Layout;