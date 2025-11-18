import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';

export const useBulkFileDelete = () => {
  const queryClient = useQueryClient();
  const [deletingFileIds, setDeletingFileIds] = useState<Set<number>>(new Set());

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setDeletingFileIds(new Set());
    },
    onError: () => {
      setDeletingFileIds(new Set());
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

