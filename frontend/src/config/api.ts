const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  // Development (localhost)
  development: {
    baseUrl: 'http://localhost:5000',
    appointments: 'http://localhost:5000/api/appointments'
  },

  // Production
  production: {
    baseUrl: 'https://api.bestgroomstudio.pl',
    appointments: 'https://api.bestgroomstudio.pl/api/appointments'
  }
};

export const API_BASE_URL = isDevelopment
  ? API_CONFIG.development.baseUrl
  : API_CONFIG.production.baseUrl;

export const APPOINTMENTS_API = isDevelopment
  ? API_CONFIG.development.appointments
  : API_CONFIG.production.appointments;

// For manual override (temporary switching)
export const FORCE_LOCALHOST = true;

export const getApiUrl = (endpoint: string) => {
  if (FORCE_LOCALHOST) {
    return `http://localhost:5000${endpoint}`;
  }
  return isDevelopment
    ? `http://localhost:5000${endpoint}`
    : `https://api.bestgroomstudio.pl${endpoint}`;
}; 