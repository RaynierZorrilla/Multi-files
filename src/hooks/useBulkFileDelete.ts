import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';
import { useToast } from '../contexts/ToastContext';

export const useBulkFileDelete = () => {
  const queryClient = useQueryClient();
  const [deletingFileIds, setDeletingFileIds] = useState<Set<number>>(new Set());
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: async (fileIds: number[]) => {
      // Eliminar archivos en paralelo
      const results = await Promise.allSettled(
        fileIds.map((fileId) => fileService.deleteFile(fileId))
      );
      
      // Verificar si hubo errores
      const errors = results.filter((r) => r.status === 'rejected');
      if (errors.length > 0) {
        throw new Error(`Failed to delete ${errors.length} file(s)`);
      }
      
      return results;
    },
    onSuccess: (_, fileIds) => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setDeletingFileIds(new Set());
      const fileCount = fileIds.length;
      const message =
        fileCount === 1
          ? 'File deleted successfully'
          : `${fileCount} files deleted successfully`;
      showSuccess(message);
    },
    onError: (error: unknown) => {
      setDeletingFileIds(new Set());
      let errorMessage = 'Failed to delete files. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      showError(errorMessage);
    },
  });

  const deleteFiles = (fileIds: number[]) => {
    setDeletingFileIds(new Set(fileIds));
    mutation.mutate(fileIds);
  };

  return {
    deleteFiles,
    isDeleting: mutation.isPending,
    deletingFileIds,
    isDeletingFile: (fileId: number) => deletingFileIds.has(fileId),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

