import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Router, ProtectedRoute } from './components';
import { HomePage, UploadPage, GalleryPage, AuthPage } from './pages';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Router
              routes={[
                { path: '/auth', component: <AuthPage /> },
                { 
                  path: '/', 
                  component: (
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  )
                },
                { 
                  path: '/upload', 
                  component: (
                    <ProtectedRoute>
                      <Layout>
                        <UploadPage />
                      </Layout>
                    </ProtectedRoute>
                  )
                },
                { 
                  path: '/gallery', 
                  component: (
                    <ProtectedRoute>
                      <Layout>
                        <GalleryPage />
                      </Layout>
                    </ProtectedRoute>
                  )
                },
              ]}
            />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
