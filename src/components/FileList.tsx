import { useState, useEffect } from 'react';
import { useFiles } from '../hooks';
import { FileCard } from './FileCard';
import { FilePreviewModal } from './FilePreviewModal';
import { FileMetadata } from '../types/file.types';
import { Loader2 } from 'lucide-react';

export const FileList = () => {
  const { data: files, isLoading, isError, error } = useFiles();
  const [previewFile, setPreviewFile] = useState<FileMetadata | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileClick = (file: FileMetadata) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (previewFile && files) {
      const fileExists = files.some((f) => f.id === previewFile.id);
      if (!fileExists) {
        setIsPreviewOpen(false);
        setPreviewFile(null);
        document.body.style.overflow = '';
      }
    }
  }, [files, previewFile]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred';
    const isNetworkError = errorMessage.includes('CORS') || errorMessage.includes('Network');
    const isServerError = errorMessage.includes('500');

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-medium">Error loading files</p>
        <p className="text-sm mt-1">{errorMessage}</p>
        {isNetworkError && (
          <div className="mt-3 text-xs bg-red-100 p-2 rounded">
            <p className="font-semibold">CORS/Network Error:</p>
            <p>Make sure the server is running at {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}</p>
            <p>Check that CORS is enabled on the server.</p>
          </div>
        )}
        {isServerError && (
          <div className="mt-3 text-xs bg-red-100 p-2 rounded">
            <p className="font-semibold">Server Error (500):</p>
            <p>There's an error on the server. Check the server logs for more details.</p>
          </div>
        )}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No files uploaded yet</p>
        <p className="text-gray-400 text-sm mt-2">Upload your first file to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file) => (
          <FileCard key={file.id} file={file} onFileClick={handleFileClick} />
        ))}
      </div>
      <FilePreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </>
  );
};
