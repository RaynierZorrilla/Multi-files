import { useState, useEffect } from 'react';
import { useFiles } from '../hooks';
import { FileCard } from './FileCard';
import { FilePreviewModal } from './FilePreviewModal';
import { FileMetadata } from '../types/file.types';
import { Loader2, Upload } from 'lucide-react';

interface FileListProps {
  selectionMode?: boolean;
  selectedFiles?: Set<number>;
  onSelectChange?: (fileId: number, selected: boolean) => void;
}

export const FileList = ({ 
  selectionMode = false, 
  selectedFiles = new Set(),
  onSelectChange 
}: FileListProps) => {
  const { data: files, isLoading, isError, error } = useFiles();
  const [previewFile, setPreviewFile] = useState<FileMetadata | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileClick = (file: FileMetadata) => {
    if (!selectionMode) {
      setPreviewFile(file);
      setIsPreviewOpen(true);
    }
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
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
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
      <div className="glass-strong border-destructive/50 rounded-2xl p-6 text-destructive">
        <p className="font-medium">Error loading files</p>
        <p className="text-sm mt-1">{errorMessage}</p>
        {isNetworkError && (
          <div className="mt-3 text-xs glass p-3 rounded-xl">
            <p className="font-semibold">CORS/Network Error:</p>
            <p>Make sure the server is running at {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}</p>
            <p>Check that CORS is enabled on the server.</p>
          </div>
        )}
        {isServerError && (
          <div className="mt-3 text-xs glass p-3 rounded-xl">
            <p className="font-semibold">Server Error (500):</p>
            <p>There's an error on the server. Check the server logs for more details.</p>
          </div>
        )}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="glass-strong rounded-3xl p-16 text-center">
        <Upload className="h-16 w-16 mx-auto mb-4 text-foreground/30" />
        <h3 className="text-xl font-semibold mb-2">No files yet</h3>
        <p className="text-foreground/60 mb-6">Upload your first file to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <FileCard 
            key={file.id} 
            file={file} 
            onFileClick={handleFileClick}
            isSelectionMode={selectionMode}
            isSelected={selectedFiles.has(file.id)}
            onSelectChange={onSelectChange}
          />
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
