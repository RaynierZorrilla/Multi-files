import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Router } from './components';
import { HomePage, UploadPage, GalleryPage } from './pages';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';

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
        <ToastProvider>
          <Layout>
            <Router
              routes={[
                { path: '/', component: <HomePage /> },
                { path: '/upload', component: <UploadPage /> },
                { path: '/gallery', component: <GalleryPage /> },
              ]}
            />
          </Layout>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
