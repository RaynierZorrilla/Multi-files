import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useFileUpload } from '../hooks';

export const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { uploadFiles, isUploading, uploadProgress, isSuccess } = useFileUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors bg-white"
      >
        <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-gray-500">
          Support for images, videos, and documents
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-700">
            Selected Files ({selectedFiles.length})
          </h3>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="ml-4 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                disabled={isUploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
          </button>
        </div>
      )}
    </div>
  );
};
