import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';
import { UploadResponse } from '../types/file.types';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useFileUpload = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: (files: File[]) =>
      fileService.uploadFiles(files, setUploadProgress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setUploadProgress(0);
      
      const fileCount = Array.isArray(data) ? data.length : 1;
      const message =
        fileCount === 1
          ? 'File uploaded successfully!'
          : `${fileCount} files uploaded successfully!`;
      showSuccess(message);
    },
    onError: (error: unknown) => {
      setUploadProgress(0);
      let errorMessage = 'Failed to upload file. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      showError(errorMessage);
    },
  });

  return {
    uploadFiles: mutation.mutate,
    isUploading: mutation.isPending,
    uploadProgress,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data as UploadResponse | undefined,
  };
};
