import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Check if the app is running in Expo Go
 */
export const isExpoGo = (): boolean => {
  return Constants.appOwnership === 'expo';
};

/**
 * Check if push notifications are supported in the current environment
 */
export const isPushNotificationSupported = (): boolean => {
  // Push notifications are not supported in Expo Go starting from SDK 53
  if (isExpoGo()) {
    return false;
  }
  
  // Additional checks for other environments
  return true;
};

/**
 * Get a safe notification handler that won't crash in Expo Go
 */
export const getNotificationHandler = () => {
  if (!isPushNotificationSupported()) {
    console.warn('Push notifications are not supported in Expo Go. Use a development build for full functionality.');
    return null;
  }
  
  return Notifications;
};

/**
 * Safely register for push notifications
 */
export const registerForPushNotifications = async (): Promise<string | null> => {
  if (!isPushNotificationSupported()) {
    console.warn('Cannot register for push notifications in Expo Go');
    return null;
  }

  try {
    // Request permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.warn('Push notification permissions not granted');
      return null;
    }

    // Get the push token
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });
    
    return token.data;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    return null;
  }
};

/**
 * Configure notification behavior
 */
export const configureNotificationBehavior = () => {
  if (!isPushNotificationSupported()) {
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

/**
 * Add notification listener safely
 */
export const addNotificationListener = (callback: (notification: Notifications.Notification) => void) => {
  if (!isPushNotificationSupported()) {
    console.warn('Cannot add notification listener in Expo Go');
    return null;
  }

  try {
    return Notifications.addNotificationReceivedListener(callback);
  } catch (error) {
    console.error('Error adding notification listener:', error);
    return null;
  }
};

/**
 * Add notification response listener safely
 */
export const addNotificationResponseListener = (callback: (response: Notifications.NotificationResponse) => void) => {
  if (!isPushNotificationSupported()) {
    console.warn('Cannot add notification response listener in Expo Go');
    return null;
  }

  try {
    return Notifications.addNotificationResponseReceivedListener(callback);
  } catch (error) {
    console.error('Error adding notification response listener:', error);
    return null;
  }
};
