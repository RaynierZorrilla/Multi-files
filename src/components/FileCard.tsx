import { useState } from 'react';
import { Download, Trash2, File, Video } from 'lucide-react';
import { FileMetadata } from '../types/file.types';
import { fileService } from '../services/file.service';
import { useFileDelete } from '../hooks';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface FileCardProps {
  file: FileMetadata;
  onFileClick?: (file: FileMetadata) => void;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onSelectChange?: (fileId: number, selected: boolean) => void;
}

export const FileCard = ({ 
  file, 
  onFileClick, 
  isSelectionMode = false, 
  isSelected = false,
  onSelectChange 
}: FileCardProps) => {
  const { deleteFile, isDeletingFile } = useFileDelete();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const isDeleting = isDeletingFile(file.id);

  const isImage = file.content_type.startsWith('image/');
  const isVideo = file.content_type.startsWith('video/');
  const isPDF = file.content_type === 'application/pdf';

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(fileService.getDownloadUrl(file.id), '_blank');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteFile(file.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCardClick = () => {
    if (isSelectionMode && onSelectChange) {
      onSelectChange(file.id, !isSelected);
    } else if (onFileClick) {
      onFileClick(file);
    }
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectChange) {
      onSelectChange(file.id, !isSelected);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow ${
        isSelectionMode ? 'cursor-pointer' : 'cursor-pointer'
      } ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
      }`}
      onClick={handleCardClick}
    >
      <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden relative">
        {isSelectionMode && (
          <div 
            className="absolute top-2 left-2 z-10"
            onClick={handleCheckboxChange}
          >
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
              isSelected 
                ? 'bg-blue-600 border-blue-600' 
                : 'bg-white border-gray-300'
            }`}>
              {isSelected && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        )}
        {isDeleting ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <File className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-500">Deleting...</p>
            </div>
          </div>
        ) : isImage ? (
          imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <File className="w-16 h-16 text-gray-400" />
            </div>
          ) : (
            <img
              src={fileService.getThumbnailUrl(file.id, { w: 400, h: 300, fit: 'contain' })}
              alt={file.original_name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )
        ) : isVideo ? (
          videoError ? (
            <div className="w-full h-full flex items-center justify-center">
              <Video className="w-16 h-16 text-gray-400" />
            </div>
          ) : (
            <>
              <video
                src={fileService.getDownloadUrl(file.id)}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity">
                <div className="bg-white bg-opacity-90 rounded-full p-3">
                  <Video className="w-8 h-8 text-gray-700" />
                </div>
              </div>
            </>
          )
        ) : isPDF ? (
          <div className="w-full h-full relative bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <File className="w-16 h-16 text-red-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-red-700 uppercase">PDF Document</p>
            </div>
          </div>
        ) : (
          <File className="w-16 h-16 text-gray-400" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate" title={file.original_name}>
          {file.original_name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{formatFileSize(file.size)}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(file.created_at)}</p>

        {!isSelectionMode && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
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
