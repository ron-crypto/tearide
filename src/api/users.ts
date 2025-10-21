import client from './client';
import { User, UserProfile, UserStats } from '../types/user';

export const usersAPI = {
  // Get user profile
  getUserProfile: async (userId?: string): Promise<User> => {
    const endpoint = userId ? `/users/${userId}` : '/users/profile';
    const response = await client.get(endpoint);
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (profileData: Partial<UserProfile>): Promise<User> => {
    const response = await client.put('/users/profile', profileData);
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (imageUri: string): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);

    const response = await client.post('/users/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user stats
  getUserStats: async (): Promise<UserStats> => {
    const response = await client.get('/users/stats');
    return response.data;
  },

  // Get user preferences
  getUserPreferences: async (): Promise<{
    notifications: boolean;
    locationTracking: boolean;
    darkMode: boolean;
    language: string;
    currency: string;
  }> => {
    const response = await client.get('/users/preferences');
    return response.data;
  },

  // Update user preferences
  updateUserPreferences: async (preferences: {
    notifications?: boolean;
    locationTracking?: boolean;
    darkMode?: boolean;
    language?: string;
    currency?: string;
  }): Promise<void> => {
    await client.put('/users/preferences', preferences);
  },

  // Get user notifications
  getUserNotifications: async (page: number = 1, limit: number = 20): Promise<{
    notifications: Array<{
      id: string;
      title: string;
      message: string;
      type: string;
      read: boolean;
      createdAt: string;
    }>;
    total: number;
    page: number;
    limit: number;
  }> => {
    const response = await client.get('/users/notifications', {
      params: { page, limit },
    });
    return response.data;
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    await client.put(`/users/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (): Promise<void> => {
    await client.put('/users/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    await client.delete(`/users/notifications/${notificationId}`);
  },

  // Get user support tickets
  getSupportTickets: async (): Promise<Array<{
    id: string;
    subject: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    createdAt: string;
    updatedAt: string;
  }>> => {
    const response = await client.get('/users/support/tickets');
    return response.data;
  },

  // Create support ticket
  createSupportTicket: async (ticketData: {
    subject: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
  }): Promise<{ id: string }> => {
    const response = await client.post('/users/support/tickets', ticketData);
    return response.data;
  },
};

