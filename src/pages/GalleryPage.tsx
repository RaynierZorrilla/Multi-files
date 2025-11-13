import { FileList } from '../components';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const GalleryPage = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['files'] });
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Gallery</h1>
          <p className="text-gray-600">Browse and manage your uploaded files</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>
      <FileList />
    </div>
  );
};
