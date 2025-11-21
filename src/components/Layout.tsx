import { ReactNode } from 'react';
import { Link } from './Link';
import { HardDrive, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../hooks';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';

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
    <div className="min-h-screen">
      {/* Header with glassmorphic effect */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <HardDrive className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text ">
                FileStorage
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2 sm:gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className="hidden sm:flex items-center px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/upload"
                    className="hidden sm:flex items-center px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                  >
                    Upload
                  </Link>
                  <Link
                    to="/gallery"
                    className="hidden sm:flex items-center px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                  >
                    Gallery
                  </Link>
                  
                  {/* Mobile Menu - could be expanded later */}
                  <div className="sm:hidden flex items-center gap-2">
                    <Link
                      to="/gallery"
                      className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                    >
                      Gallery
                    </Link>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                >
                  Login
                </Link>
              )}
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-xl hover:bg-accent/50"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-foreground/70" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground/70" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer with glassmorphic effect */}
      <footer className="mt-16 py-8 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-foreground/60 text-sm">
              File Storage System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
