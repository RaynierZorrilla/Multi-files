import axios from 'axios';
import { API_CONFIG, TOKEN_KEY } from '../config/api.config';
import {
  FileMetadata,
  UploadResponse,
  FileListParams,
  DeleteResponse,
} from '../types/file.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Interceptor para incluir el token en todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 (token expirado o inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem(TOKEN_KEY);
      // Redirigir a login
      window.history.pushState({}, '', '/auth');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    return Promise.reject(error);
  }
);

export const fileService = {
  uploadFiles: async (
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post<UploadResponse>(
      API_CONFIG.ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      }
    );

    return response.data;
  },

  getAllFiles: async (params?: FileListParams): Promise<FileMetadata[]> => {
    const response = await api.get<FileMetadata[]>(API_CONFIG.ENDPOINTS.FILES, {
      params,
    });
    return response.data;
  },

  getFileById: async (fileId: number): Promise<FileMetadata> => {
    const response = await api.get<FileMetadata>(
      API_CONFIG.ENDPOINTS.FILE(fileId)
    );
    return response.data;
  },

  deleteFile: async (fileId: number): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(
      API_CONFIG.ENDPOINTS.FILE(fileId)
    );
    return response.data;
  },

  getFileUrl: (fileId: number): string => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FILE(fileId)}`;
  },

  getThumbnailUrl: (
    fileId: number,
    options?: { w?: number; h?: number; fit?: 'contain' | 'crop' }
  ): string => {
    const baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.THUMBNAIL(fileId)}`;
    if (options && (options.w || options.h || options.fit)) {
      const params = new URLSearchParams();
      if (options.w) params.append('w', options.w.toString());
      if (options.h) params.append('h', options.h.toString());
      if (options.fit) params.append('fit', options.fit);
      return `${baseUrl}?${params.toString()}`;
    }
    return baseUrl;
  },

  getDownloadUrl: (fileId: number): string => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOWNLOAD(fileId)}`;
  },

  // Función para obtener una imagen/video como blob URL con autenticación
  getAuthenticatedUrl: async (url: string): Promise<string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    try {
      const response = await fetch(url, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch resource: ${response.status}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching authenticated resource:', error);
      throw error;
    }
  },
};
