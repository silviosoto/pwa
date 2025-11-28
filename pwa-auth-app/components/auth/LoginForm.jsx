'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import {
  Email as EmailIcon,
  Badge as BadgeIcon,
  Lock as LockIcon,
  Security as CaptchaIcon,
} from '@mui/icons-material';

const TermsDialog = ({ open, onClose, onAccept }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Términos y Condiciones de Uso
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              1. Aceptación de los Términos
            </Typography>
            <Typography variant="body2" paragraph>
              Al acceder y utilizar esta aplicación, usted acepta cumplir con estos términos y condiciones de uso.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              2. Uso de la Aplicación
            </Typography>
            <Typography variant="body2" paragraph>
              La aplicación está destinada para uso interno de la organización. No está permitido el uso no autorizado.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              3. Protección de Datos
            </Typography>
            <Typography variant="body2" paragraph>
              Sus datos personales serán protegidos de acuerdo con nuestra política de privacidad y la legislación aplicable.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              4. Responsabilidades
            </Typography>
            <Typography variant="body2" paragraph>
              El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              5. Modificaciones
            </Typography>
            <Typography variant="body2">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán notificadas.
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={onAccept} variant="contained" autoFocus>
          Aceptar Términos
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const { login } = useAuth();
  const router = useRouter();
  const recaptchaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!termsAccepted) {
      setError('Debe aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    if (!captchaToken) {
      setError('Por favor complete la verificación "No soy un robot"');
      setLoading(false);
      return;
    }

    const result = await login(email, identityNumber, captchaToken);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
      // Resetear captcha en caso de error
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
    
    setLoading(false);
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setError(''); // Limpiar error si había uno
  };

  const handleCaptchaErrored = () => {
    setError('Error en la verificación de seguridad. Por favor recargue la página.');
    setCaptchaToken(null);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleTermsOpen = () => {
    setTermsDialogOpen(true);
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setTermsDialogOpen(false);
  };

  const handleTermsClose = () => {
    setTermsDialogOpen(false);
  };

  return (
    <Container 
      component="main" 
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderRadius: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'white',
            mb: 2
          }}
        >
          <LockIcon fontSize="large" />
        </Box>

        <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
          Iniciar Sesión
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Ingresa tus credenciales para acceder a la aplicación
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="identityNumber"
            label="Número de Identidad"
            type="text"
            id="identityNumber"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Sección de reCAPTCHA v2 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Verificación de seguridad:
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                border: '1px solid',
                borderColor: captchaToken ? 'success.main' : 'grey.300',
                borderRadius: 2,
                backgroundColor: captchaToken ? 'success.light' : 'transparent',
                p: 1,
                minHeight: '78px',
                alignItems: 'center'
              }}
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Clave de prueba de Google
                onChange={handleCaptchaChange}
                onErrored={handleCaptchaErrored}
                onExpired={handleCaptchaExpired}
                size="normal"
                theme="light"
              />
            </Box>
            {captchaToken && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <CaptchaIcon color="success" fontSize="small" />
                <Typography variant="caption" color="success.main">
                  Verificación completada ✓
                </Typography>
              </Box>
            )}
          </Box>

          {/* Términos y condiciones */}
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                Acepto los{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={handleTermsOpen}
                  sx={{ fontWeight: 'bold' }}
                >
                  términos y condiciones
                </Link>
              </Typography>
            }
            sx={{ mb: 3, width: '100%' }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !termsAccepted || !captchaToken}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              position: 'relative'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Ingresar a la Aplicación'
            )}
          </Button>
        </Box>

        {/* Información de reCAPTCHA */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.50', borderRadius: 2, width: '100%' }}>
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            Este sitio está protegido por reCAPTCHA y se aplican la{' '}
            <Link href="https://policies.google.com/privacy" target="_blank" variant="caption">
              Política de Privacidad
            </Link>{' '}
            y los{' '}
            <Link href="https://policies.google.com/terms" target="_blank" variant="caption">
              Términos de Servicio
            </Link>{' '}
            de Google.
          </Typography>
        </Box>

        {/* Datos de prueba */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2, width: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Datos de prueba:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Admin: admin@example.com / 123456789
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manager: manager@example.com / 987654321
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User: user@example.com / 456123789
          </Typography>
        </Box>
      </Paper>

      {/* Diálogo de términos y condiciones */}
      <TermsDialog
        open={termsDialogOpen}
        onClose={handleTermsClose}
        onAccept={handleTermsAccept}
      />
    </Container>
  );
};

export default LoginForm;