import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  fileName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const ConfirmDeleteModal = ({
  isOpen,
  fileName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: ConfirmDeleteModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Don't manipulate overflow here - the parent modal already handles it
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Don't manipulate overflow here - the parent modal already handles it
    };
  }, [isOpen, onCancel, isDeleting]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-slide-in">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Delete File
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-4 break-words">
              {fileName}?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              This action cannot be undone. The file will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onCancel}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-4 py-2 text-white bg-red-600 dark:bg-red-500 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {!isDeleting && (
            <button
              onClick={onCancel}
              className="flex-shrink-0 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

