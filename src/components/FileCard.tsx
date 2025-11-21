import { useState, useEffect } from 'react';
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const isDeleting = isDeletingFile(file.id);

  const isImage = file.content_type.startsWith('image/');
  const isVideo = file.content_type.startsWith('video/');
  const isPDF = file.content_type === 'application/pdf';

  // Cargar URLs autenticadas para imágenes y videos
  useEffect(() => {
    let imageBlobUrl: string | null = null;
    let videoBlobUrl: string | null = null;

    if (isImage && !imageError) {
      fileService
        .getAuthenticatedUrl(fileService.getThumbnailUrl(file.id, { w: 400, h: 300, fit: 'contain' }))
        .then((url) => {
          imageBlobUrl = url;
          setImageUrl(url);
        })
        .catch(() => {
          setImageError(true);
        });
    }

    if (isVideo && !videoError) {
      fileService
        .getAuthenticatedUrl(fileService.getDownloadUrl(file.id))
        .then((url) => {
          videoBlobUrl = url;
          setVideoUrl(url);
        })
        .catch(() => {
          setVideoError(true);
        });
    }

    // Cleanup: revocar URLs de blob cuando el componente se desmonte
    return () => {
      if (imageBlobUrl) {
        URL.revokeObjectURL(imageBlobUrl);
      }
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [file.id, isImage, isVideo, imageError, videoError]);

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
      className={`group relative glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:glass-strong transition-all duration-300 cursor-pointer shimmer ${
        isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
      } hover:scale-[1.02] hover:shadow-xl`}
      onClick={handleCardClick}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden relative rounded-xl mb-4">
        {isSelectionMode && (
          <div 
            className="absolute top-4 right-4 z-10"
            onClick={handleCheckboxChange}
          >
            <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              isSelected 
                ? 'bg-primary border-primary' 
                : 'border-foreground/30 bg-background/50'
            }`}>
              {isSelected && (
                <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        )}
        {isDeleting ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <File className="w-16 h-16 text-foreground/30 mx-auto mb-2" />
              <p className="text-xs font-medium text-foreground/50">Deleting...</p>
            </div>
          </div>
        ) : isImage ? (
          imageError || !imageUrl ? (
            <div className="w-full h-full flex items-center justify-center">
              <File className="w-16 h-16 text-foreground/30" />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={file.original_name}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )
        ) : isVideo ? (
          videoError || !videoUrl ? (
            <div className="w-full h-full flex items-center justify-center">
              <Video className="w-16 h-16 text-foreground/30" />
            </div>
          ) : (
            <>
              <video
                src={videoUrl}
                className="w-full h-full object-cover rounded-xl"
                muted
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-opacity rounded-xl">
                <div className="glass-strong rounded-full p-3">
                  <Video className="w-8 h-8 text-foreground" />
                </div>
              </div>
            </>
          )
        ) : isPDF ? (
          <div className="w-full h-full relative bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center rounded-xl">
            <div className="text-center">
              <File className="w-16 h-16 text-destructive mx-auto mb-2" />
              <p className="text-xs font-medium text-destructive uppercase">PDF Document</p>
            </div>
          </div>
        ) : (
          <File className="w-16 h-16 text-foreground/30" />
        )}
      </div>

      {/* File Info */}
      <div className="text-center">
        <h3 className="font-semibold mb-1 truncate text-sm sm:text-base text-balance" title={file.original_name}>
          {file.original_name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/60 flex-wrap">
          <span>{formatFileSize(file.size)}</span>
          <span>•</span>
          <span className="hidden sm:inline">{formatDate(file.created_at)}</span>
          <span className="sm:hidden">{new Date(file.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions (shown on hover when not in selection mode) */}
      {!isSelectionMode && (
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-secondary text-secondary-foreground py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl hover:bg-secondary/90 transition-colors text-xs font-medium"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground rounded-lg sm:rounded-xl h-7 sm:h-8 px-2 sm:px-3 hover:bg-destructive/90 transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
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
