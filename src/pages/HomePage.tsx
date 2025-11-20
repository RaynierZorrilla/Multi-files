import { Upload, FolderOpen, Zap } from 'lucide-react';
import { Link } from '../components/Link';

export const HomePage = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          File Storage Made Simple
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Upload, manage, and share your files with ease. Support for images, videos, and documents.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            to="/upload"
            className="bg-blue-600 dark:bg-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/gallery"
            className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-8 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Gallery
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-colors">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Upload</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Drag and drop or click to upload multiple files at once
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-colors">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Organized Storage</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All your files organized with metadata and thumbnails
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-colors">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast & Secure</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Lightning fast downloads with secure file handling
          </p>
        </div>
      </div>
    </div>
  );
};
