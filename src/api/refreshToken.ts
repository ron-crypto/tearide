import axios from 'axios';
import { setItem } from '../utils/storage';

export const refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
    {
      refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
