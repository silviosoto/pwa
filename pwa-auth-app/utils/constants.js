export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const API_ENDPOINTS = {
  LOGIN: 'http://localhost:5174/api/auth/login',
  VALIDATE_TOKEN: 'http://localhost:5174/api/auth/validate',
  REFRESH_TOKEN: 'http://localhost:5174/api/auth/refresh'
};

export const TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';