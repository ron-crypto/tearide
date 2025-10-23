import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authAPI } from '../api/auth';
import { getItem, setItem, removeItem } from '../utils/storage';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.login(email, password);
      
      await setItem('auth_token', response.accessToken);
      await setItem('refresh_token', response.refreshToken);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Login failed' });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.register(userData);
      
      await setItem('auth_token', response.accessToken);
      await setItem('refresh_token', response.refreshToken);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Registration failed' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await removeItem('auth_token');
      await removeItem('refresh_token');
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const updatedUser = await authAPI.updateProfile(userData);
      dispatch({ type: 'AUTH_UPDATE_USER', payload: updatedUser });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Profile update failed' });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authAPI.forgotPassword(email);
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Password reset failed' });
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await authAPI.resetPassword(token, newPassword);
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Password reset failed' });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'AUTH_START' });
      const token = await getItem('auth_token');
      
      if (!token) {
        dispatch({ type: 'AUTH_LOGOUT' });
        return;
      }

      // Add timeout to prevent hanging if backend is unavailable
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Authentication check timeout')), 3000);
      });

      const userPromise = authAPI.getCurrentUser();
      const user = await Promise.race([userPromise, timeoutPromise]) as User;
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      console.log('Auth check failed:', error);
      // Only clear tokens if it's an authentication error, not a network error
      // if (error?.response?.status === 401) {
      //   await removeItem('auth_token');
      //   await removeItem('refresh_token');
      // }

      await removeItem('auth_token');
      await removeItem('refresh_token');
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  useEffect(() => {
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (state.isLoading) {
        console.log('Auth check timeout - proceeding to logout');
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    }, 10000); // 10 second timeout

    checkAuthStatus();

    return () => clearTimeout(timeoutId);
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    clearError,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

