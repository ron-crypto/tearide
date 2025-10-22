import client from './client';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth';

export const authAPI = {
  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await client.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await client.post('/auth/register', userData);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  },

  

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await client.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await client.post('/auth/reset-password', {
      token,
      newPassword,
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await client.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await client.put('/auth/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await client.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  // Delete account
  deleteAccount: async (password: string): Promise<void> => {
    await client.delete('/auth/account', {
      data: { password },
    });
  },
};

