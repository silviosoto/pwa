import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css';

export const metadata = {
  title: 'Mi PWA App',
  description: 'Aplicación PWA con autenticación',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}