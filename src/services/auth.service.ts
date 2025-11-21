import axios from 'axios';
import { API_CONFIG, TOKEN_KEY } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export interface SignupRequest {
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
      {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
      }
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        email: data.email,
        password: data.password,
      }
    );
    return response.data;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },
};

