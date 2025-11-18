import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';

export const useFileDelete = () => {
  const queryClient = useQueryClient();
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: (fileId: number) => fileService.deleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setDeletingFileId(null);
    },
    onError: () => {
      setDeletingFileId(null);
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
