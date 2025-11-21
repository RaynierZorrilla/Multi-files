export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      SIGNUP: '/auth/signup',
      LOGIN: '/auth/login',
    },
    UPLOAD: '/upload',
    FILES: '/files',
    FILE: (fileId: number) => `/files/${fileId}`,
    DOWNLOAD: (fileId: number) => `/files/${fileId}/download`,
    THUMBNAIL: (fileId: number) => `/images/${fileId}/thumbnail`,
  },
  MAX_FILE_SIZE_MB: 500,
};

export const TOKEN_KEY = 'access_token';
