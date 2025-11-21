import { useState } from 'react';
import { FileList, FileUpload } from '../components';
import { RefreshCw, CheckSquare, Square, Trash2, Upload, Grid3x3 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useBulkFileDelete, useFiles } from '../hooks';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { Button } from '../components/ui/Button';

export const GalleryPage = () => {
  const queryClient = useQueryClient();
  const { data: files } = useFiles();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2">My Files</h1>
              <p className="text-sm sm:text-base text-foreground/60">Manage and organize your uploads</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="icon"
                className="glass rounded-xl hover:glass-strong bg-transparent flex-shrink-0"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="glass rounded-xl hover:glass-strong bg-transparent flex-1 sm:flex-initial"
                onClick={() => setShowUpload(!showUpload)}
              >
                <Upload className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
          </div>

          {/* Upload Area */}
          {showUpload && !selectionMode && (
            <div className="mb-4 sm:mb-6 glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-top-4 duration-300">
              <FileUpload />
            </div>
          )}

          {/* Controls Bar */}
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant={selectionMode ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-xl text-xs sm:text-sm"
                  onClick={handleToggleSelectionMode}
                >
                  {selectionMode ? <CheckSquare className="h-4 w-4 sm:mr-2" /> : <Square className="h-4 w-4 sm:mr-2" />}
                  <span className="hidden sm:inline">{selectionMode ? 'Cancel Selection' : 'Select Files'}</span>
                  <span className="sm:hidden">{selectionMode ? 'Cancel' : 'Select'}</span>
                </Button>

                {selectionMode && (
                  <>
                    <Button variant="ghost" size="sm" className="rounded-xl text-xs sm:text-sm" onClick={handleSelectAll}>
                      <span className="hidden sm:inline">Select All</span>
                      <span className="sm:hidden">All</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-xl text-xs sm:text-sm" onClick={handleDeselectAll}>
                      <span className="hidden sm:inline">Deselect All</span>
                      <span className="sm:hidden">None</span>
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end">
                {selectionMode && selectedCount > 0 && (
                  <Button variant="destructive" size="sm" className="rounded-xl text-xs sm:text-sm flex-1 sm:flex-initial" onClick={handleBulkDelete} disabled={isDeleting}>
                    <Trash2 className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Delete Selected ({selectedCount})</span>
                    <span className="sm:hidden">Delete ({selectedCount})</span>
                  </Button>
                )}
                {files && (
                  <div className="flex items-center gap-1 px-2 sm:px-3 py-1 glass-strong rounded-xl flex-shrink-0">
                    <Grid3x3 className="h-3 w-3 sm:h-4 sm:w-4 text-foreground/60" />
                    <span className="text-xs sm:text-sm text-foreground/60">{files.length} files</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Files Grid */}
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
    </div>
  );
};
