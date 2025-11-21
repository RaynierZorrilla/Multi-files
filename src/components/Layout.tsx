import { ReactNode } from 'react';
import { Link } from './Link';
import { HardDrive, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../hooks';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/auth');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <HardDrive className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>FileStorage</span>
            </Link>
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/upload"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                  >
                    Upload
                  </Link>
                  <Link
                    to="/gallery"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                  >
                    Gallery
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {children}
      </main>

      <footer className="mt-16 py-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>File Storage System - Powered by FastAPI & React</p>
        </div>
      </footer>
    </div>
  );
};
