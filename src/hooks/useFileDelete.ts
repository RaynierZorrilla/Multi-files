import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';
import { useToast } from '../contexts/ToastContext';

export const useFileDelete = () => {
  const queryClient = useQueryClient();
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: (fileId: number) => fileService.deleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setDeletingFileId(null);
      showSuccess('File deleted successfully');
    },
    onError: (error: unknown) => {
      setDeletingFileId(null);
      let errorMessage = 'Failed to delete file. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      showError(errorMessage);
    },
  });

  const deleteFile = (fileId: number) => {
    setDeletingFileId(fileId);
    mutation.mutate(fileId);
  };

  return {
    deleteFile,
    isDeleting: mutation.isPending,
    deletingFileId,
    isDeletingFile: (fileId: number) => deletingFileId === fileId && mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
