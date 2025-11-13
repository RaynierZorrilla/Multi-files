import { useQuery } from '@tanstack/react-query';
import { fileService } from '../services/file.service';
import { FileListParams } from '../types/file.types';

export const useFiles = (params?: FileListParams) => {
  return useQuery({
    queryKey: ['files', params],
    queryFn: () => fileService.getAllFiles(params),
    staleTime: 30000,
  });
};
