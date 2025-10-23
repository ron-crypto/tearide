import { 
  isPushNotificationSupported, 
  registerForPushNotifications,
  configureNotificationBehavior 
} from './notificationUtils';

/**
 * Initialize notifications for the app
 * This should be called during app startup
 */
export const initializeNotifications = async (): Promise<string | null> => {
  try {
    // Configure notification behavior first
    configureNotificationBehavior();

    // Check if push notifications are supported
    if (!isPushNotificationSupported()) {
      console.warn('Push notifications are not supported in Expo Go. Use a development build for full functionality.');
      return null;
    }

    // Register for push notifications
    const pushToken = await registerForPushNotifications();
    
    if (pushToken) {
      console.log('Push notification token:', pushToken);
      // Here you would typically send this token to your backend
      // await sendTokenToBackend(pushToken);
    }

    return pushToken;
  } catch (error) {
    console.error('Error initializing notifications:', error);
    return null;
  }
};

/**
 * Send push token to backend (implement based on your API)
 */
export const sendTokenToBackend = async (token: string): Promise<void> => {
  try {
    // Implement your API call to register the push token
    // Example:
    // await api.post('/notifications/register-token', { token });
    console.log('Token should be sent to backend:', token);
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};
