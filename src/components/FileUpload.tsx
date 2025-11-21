import { useRef, useState } from 'react';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { useFileUpload } from '../hooks';
import { Button } from './ui/Button';

export const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { uploadFiles, isUploading, uploadProgress, isSuccess } = useFileUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      uploadFiles(selectedFiles);
    }
  };

  if (isSuccess) {
    setTimeout(() => setSelectedFiles([]), 1000);
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type === 'application/pdf') return '📄';
    return '📁';
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 border-2 border-dashed transition-all duration-300 cursor-pointer group ${
          isDragging
            ? 'border-primary scale-[1.02] bg-primary/5 shadow-xl shadow-primary/20'
            : 'border-primary/30 hover:border-primary/50 hover:bg-primary/5'
        }`}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative text-center">
          <div className={`mb-4 sm:mb-6 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-primary/10 transition-transform duration-300 ${
            isDragging ? 'scale-110' : 'group-hover:scale-105'
          }`}>
            <Upload className={`h-8 w-8 sm:h-10 sm:w-10 text-primary transition-transform duration-300 ${
              isDragging ? 'animate-bounce' : ''
            }`} />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Drop your files here</h3>
          <p className="text-sm sm:text-base text-foreground/60 mb-4 sm:mb-6 max-w-md mx-auto px-2">
            Drag and drop files here, or click to browse from your device
          </p>
          
          <Button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            size="lg"
            className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>

          <p className="text-xs text-foreground/50 mt-3 sm:mt-4">
            Supports images, videos, documents, and more
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">
              Selected Files <span className="text-foreground/60">({selectedFiles.length})</span>
            </h3>
            {!isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFiles([])}
                className="text-xs sm:text-sm text-foreground/60 hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="group glass rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:glass-strong transition-all duration-300 shimmer"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-xl sm:text-2xl">
                    {getFileIcon(file)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/60 mt-0.5 sm:mt-1">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span className="capitalize truncate">{file.type.split('/')[0] || 'File'}</span>
                    </div>
                  </div>

                  {!isUploading && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="flex-shrink-0 p-1.5 sm:p-2 text-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded-lg sm:rounded-xl transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-foreground">Uploading files...</span>
                <span className="text-xs sm:text-sm text-foreground/60">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300 shadow-lg shadow-primary/25"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && !isUploading && (
            <div className="glass-strong border-2 border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 animate-in fade-in duration-300">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-foreground">Upload successful!</p>
                <p className="text-xs sm:text-sm text-foreground/60">Your files have been uploaded successfully</p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {!isUploading && (
            <Button
              onClick={handleUpload}
              size="lg"
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
