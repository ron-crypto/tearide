import * as SecureStore from 'expo-secure-store';

export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting item from storage:', error);
    return null;
  }
};

export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Error setting item in storage:', error);
    throw error;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing item from storage:', error);
    throw error;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    // Get all keys and remove them
    const keys = ['auth_token', 'refresh_token', 'user_data', 'offline_queue'];
    await Promise.all(keys.map(key => removeItem(key)));
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

