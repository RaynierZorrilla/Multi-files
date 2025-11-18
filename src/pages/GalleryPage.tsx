import { useState } from 'react';
import { FileList } from '../components';
import { RefreshCw, CheckSquare, Square, Trash2, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useBulkFileDelete, useFiles } from '../hooks';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export const GalleryPage = () => {
  const queryClient = useQueryClient();
  const { data: files } = useFiles();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const { deleteFiles, isDeleting } = useBulkFileDelete();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['files'] });
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedFiles(new Set());
    }
  };

  const handleSelectChange = (fileId: number, selected: boolean) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(fileId);
      } else {
        newSet.delete(fileId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (files && files.length > 0) {
      setSelectedFiles(new Set(files.map((file) => file.id)));
    }
  };

  const handleDeselectAll = () => {
    setSelectedFiles(new Set());
  };

  const handleBulkDelete = () => {
    if (selectedFiles.size > 0) {
      setShowBulkDeleteModal(true);
    }
  };

  const handleConfirmBulkDelete = () => {
    deleteFiles(Array.from(selectedFiles));
    setShowBulkDeleteModal(false);
    setSelectedFiles(new Set());
    setSelectionMode(false);
  };

  const handleCancelBulkDelete = () => {
    setShowBulkDeleteModal(false);
  };

  const selectedCount = selectedFiles.size;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Gallery</h1>
          <p className="text-gray-600">Browse and manage your uploaded files</p>
        </div>
        <div className="flex items-center gap-2">
          {selectionMode && (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm font-medium text-blue-700">
                  {selectedCount} selected
                </span>
              </div>
              <button
                onClick={selectedCount > 0 ? handleDeselectAll : handleSelectAll}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {selectedCount > 0 ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>Deselect All</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4" />
                    <span>Select All</span>
                  </>
                )}
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedCount === 0 || isDeleting}
                className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected</span>
              </button>
              <button
                onClick={handleToggleSelectionMode}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          )}
          {!selectionMode && (
            <>
              <button
                onClick={handleToggleSelectionMode}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Select Files</span>
              </button>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </>
          )}
        </div>
      </div>
      <FileList 
        selectionMode={selectionMode}
        selectedFiles={selectedFiles}
        onSelectChange={handleSelectChange}
      />
      <ConfirmDeleteModal
        isOpen={showBulkDeleteModal}
        fileName={`${selectedCount} file${selectedCount !== 1 ? 's' : ''}`}
        onConfirm={handleConfirmBulkDelete}
        onCancel={handleCancelBulkDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
