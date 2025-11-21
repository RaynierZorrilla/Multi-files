import { useMutation } from '@tanstack/react-query';
import { authService, LoginRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const useLogin = () => {
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      login(data.access_token);
      showSuccess('Login successful!');
      // Redirigir a la página principal después del login
      // Usar requestAnimationFrame para asegurar que el estado se actualice primero
      requestAnimationFrame(() => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        // Disparar evento personalizado para asegurar que el Router lo detecte
        window.dispatchEvent(new Event('navigation'));
      });
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to login. Please check your credentials.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };
        if (axiosError.response?.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (axiosError.response?.data?.detail) {
          errorMessage = axiosError.response.data.detail;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      showError(errorMessage);
    },
  });

  return {
    login: mutation.mutate,
    isLoggingIn: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

