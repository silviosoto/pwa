import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { TOKEN_KEY, USER_DATA_KEY } from './constants';

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET || 'default-secret-key';

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

export const setAuthData = (token, userData) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, secure: true });
  Cookies.set(USER_DATA_KEY, encryptData(userData), { expires: 1, secure: true });
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const getUserData = () => {
  const encryptedData = Cookies.get(USER_DATA_KEY);
  return encryptedData ? decryptData(encryptedData) : null;
};

export const clearAuthData = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_DATA_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const hasRole = (requiredRole) => {
  const userData = getUserData();
  return userData?.role === requiredRole;
};