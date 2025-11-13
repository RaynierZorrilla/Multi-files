import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import {
  FileMetadata,
  UploadResponse,
  FileListParams,
  DeleteResponse,
} from '../types/file.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

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
};
