import { ReactNode } from 'react';
import { Link } from './Link';
import { HardDrive } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <HardDrive className="w-6 h-6 text-blue-600" />
              <span>FileStorage</span>
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/upload"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                to="/gallery"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {children}
      </main>

      <footer className="mt-16 py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>File Storage System - Powered by FastAPI & React</p>
        </div>
      </footer>
    </div>
  );
};
