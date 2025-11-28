import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

export const metadata = {
  title: 'Mi App PWA',
  description: 'Aplicación móvil PWA con autenticación',
  manifest: '/manifest.json',
  themeColor: '#1976d2',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body>       
          <CssBaseline />
          <AuthProvider>
            <div style={{ 
              maxWidth: '428px', 
              margin: '0 auto', 
              minHeight: '100vh',
              backgroundColor: '#f5f5f5'
            }}>
              {children}
            </div>
          </AuthProvider>         
      </body>
    </html>
  );
}