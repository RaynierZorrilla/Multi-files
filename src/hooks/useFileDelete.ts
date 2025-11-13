import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/file.service';

export const useFileDelete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (fileId: number) => fileService.deleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });

  return {
    deleteFile: mutation.mutate,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
