import { useState, useEffect } from 'react';
import { usersAPI } from '../api/users';
import { 
  isPushNotificationSupported, 
  addNotificationListener,
  configureNotificationBehavior 
} from '../utils/notificationUtils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearError: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersAPI.getUserNotifications();
      setNotifications(response.notifications);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await usersAPI.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await usersAPI.markAllNotificationsAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await usersAPI.deleteNotification(notificationId);
      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      );
    } catch (err: any) {
      setError(err.message || 'Failed to delete notification');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Configure notification handling
  useEffect(() => {
    // Configure notification behavior first
    configureNotificationBehavior();

    // Only add listener if push notifications are supported
    if (!isPushNotificationSupported()) {
      console.warn('Push notifications are not supported in Expo Go. Use a development build for full functionality.');
      return;
    }

    const subscription = addNotificationListener(notification => {
      // Handle received notification
      const newNotification: Notification = {
        id: notification.request.identifier,
        title: notification.request.content.title || '',
        message: notification.request.content.body || '',
        type: 'push',
        read: false,
        createdAt: new Date().toISOString(),
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearError,
  };
};

