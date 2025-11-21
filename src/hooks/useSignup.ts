import { useMutation } from '@tanstack/react-query';
import { authService, SignupRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const useSignup = () => {
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      login(data.access_token);
      showSuccess('Account created successfully!');
      // Redirigir a la página principal después del registro
      // Usar requestAnimationFrame para asegurar que el estado se actualice primero
      requestAnimationFrame(() => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        // Disparar evento personalizado para asegurar que el Router lo detecte
        window.dispatchEvent(new Event('navigation'));
      });
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };
        if (axiosError.response?.status === 400) {
          errorMessage = 'Email already registered.';
        } else if (axiosError.response?.status === 422) {
          errorMessage = 'Invalid data. Please check your input.';
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
    signup: mutation.mutate,
    isSigningUp: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

