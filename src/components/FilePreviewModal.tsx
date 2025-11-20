import { useState, useEffect } from 'react';
import { X, Download, Trash2, File } from 'lucide-react';
import { FileMetadata } from '../types/file.types';
import { fileService } from '../services/file.service';
import { useFileDelete } from '../hooks';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface FilePreviewModalProps {
  file: FileMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreviewModal = ({ file, isOpen, onClose }: FilePreviewModalProps) => {
  const { deleteFile, isDeleting, deletingFileId, isSuccess } = useFileDelete();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowDeleteModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isDeleting && deletingFileId !== null && file && file.id === deletingFileId) {
      // Cerrar el modal inmediatamente cuando se inicia la eliminación
      setShowDeleteModal(false);
      requestAnimationFrame(() => {
        document.body.style.overflow = '';
        onClose();
      });
    }
  }, [isDeleting, deletingFileId, file, onClose]);

  useEffect(() => {
    if (isSuccess && deletingFileId !== null && !isDeleting) {
      setShowDeleteModal(false);
    }
  }, [isSuccess, deletingFileId, isDeleting]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showDeleteModal && isOpen) {
        onClose();
      }
    };

    if (isOpen && !isDeleting) {
      document.addEventListener('keydown', handleEscape);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = originalOverflow || '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose, showDeleteModal, isDeleting]);

  useEffect(() => {
    // Resetear errores cuando cambia el archivo
    if (file) {
      setImageError(false);
      setVideoError(false);
    }
  }, [file]);

  if (!isOpen || !file) return null;

  const isImage = file.content_type.startsWith('image/');
  const isVideo = file.content_type.startsWith('video/');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = () => {
    window.open(fileService.getDownloadUrl(file.id), '_blank');
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (file) {
      deleteFile(file.id);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {file.original_name}
            </h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{file.content_type}</span>
              <span>•</span>
              <span>{formatDate(file.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          {isDeleting ? (
            <div className="text-center max-w-md">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-8 inline-block mb-4">
                <File className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Deleting file...</h3>
            </div>
          ) : isImage ? (
            <div className="max-w-full max-h-full">
              {imageError ? (
                <div className="text-center max-w-md">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-8 inline-block mb-4">
                    <File className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Image not available</h3>
                </div>
              ) : (
                <img
                  src={fileService.getDownloadUrl(file.id)}
                  alt={file.original_name}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          ) : isVideo ? (
            <div className="w-full max-w-4xl">
              {videoError ? (
                <div className="text-center max-w-md">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-8 inline-block mb-4">
                    <File className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Video not available</h3>
                </div>
              ) : (
                <video
                  src={fileService.getDownloadUrl(file.id)}
                  controls
                  className="w-full max-h-[70vh] rounded-lg shadow-lg"
                  onError={() => setVideoError(true)}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-8 inline-block mb-4">
                <File className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {file.original_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This file type cannot be previewed in the browser.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium dark:text-gray-200">{file.content_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="font-medium dark:text-gray-200">{formatFileSize(file.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Extension:</span>
                  <span className="font-medium dark:text-gray-200">{file.ext}</span>
                </div>
                {file.width && file.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                    <span className="font-medium dark:text-gray-200">
                      {file.width} × {file.height}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        fileName={file.original_name}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

