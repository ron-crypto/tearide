// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.100.86:8000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'TeaRide',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@tearide.com',
  SUPPORT_PHONE: '+254 700 000 000',
  WEBSITE: 'https://tearide.com',
};

// Location Configuration
export const LOCATION_CONFIG = {
  DEFAULT_LATITUDE: -1.2921, // Nairobi
  DEFAULT_LONGITUDE: 36.8219,
  DEFAULT_ZOOM: 15,
  TRACKING_INTERVAL: 5000, // 5 seconds
  DISTANCE_THRESHOLD: 10, // 10 meters
};

// Ride Configuration
export const RIDE_CONFIG = {
  MAX_DISTANCE: 50, // 50 km
  MIN_DISTANCE: 0.1, // 100 meters
  MAX_WAIT_TIME: 300, // 5 minutes
  CANCELLATION_FEE: 50, // KSh 50
  SURGE_MULTIPLIER: 2.0,
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  CURRENCY: 'KES',
  MIN_AMOUNT: 50, // KSh 50
  MAX_AMOUNT: 10000, // KSh 10,000
  PROCESSING_FEE: 0.02, // 2%
  MPESA_LIMIT: 150000, // KSh 150,000
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  TYPES: {
    RIDE_REQUEST: 'ride_request',
    RIDE_ACCEPTED: 'ride_accepted',
    RIDE_CANCELLED: 'ride_cancelled',
    RIDE_COMPLETED: 'ride_completed',
    PAYMENT_RECEIVED: 'payment_received',
    DRIVER_ARRIVED: 'driver_arrived',
    PROMOTION: 'promotion',
    SYSTEM: 'system',
  },
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  },
};

// User Roles
export const USER_ROLES = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
  ADMIN: 'admin',
} as const;

// Ride Types
export const RIDE_TYPES = {
  STANDARD: 'standard',
  COMFORT: 'comfort',
  PREMIUM: 'premium',
} as const;

// Ride Status
export const RIDE_STATUS = {
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  ARRIVED: 'arrived',
  STARTED: 'started',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  CASH: 'cash',
  CARD: 'card',
  WALLET: 'wallet',
} as const;

// Driver Status
export const DRIVER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTHENTICATION_ERROR: 'Authentication failed. Please login again.',
  AUTHORIZATION_ERROR: 'You do not have permission to perform this action.',
  NOT_FOUND_ERROR: 'The requested resource was not found.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful!',
  RIDE_REQUESTED: 'Ride request sent successfully!',
  RIDE_ACCEPTED: 'Ride accepted successfully!',
  RIDE_COMPLETED: 'Ride completed successfully!',
  PAYMENT_SUCCESS: 'Payment processed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  OFFLINE_QUEUE: 'offline_queue',
  SETTINGS: 'settings',
  LOCATION: 'location',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
  },
  RIDES: {
    REQUEST: '/rides/request',
    ACTIVE: '/rides/active',
    HISTORY: '/rides/history',
    ESTIMATE: '/rides/estimate',
    CANCEL: '/rides/cancel',
    COMPLETE: '/rides/complete',
  },
  PAYMENTS: {
    PROCESS: '/payments/process',
    METHODS: '/payments/methods',
    HISTORY: '/payments/history',
    MPESA: '/payments/mpesa',
  },
  USERS: {
    PROFILE: '/users/profile',
    STATS: '/users/stats',
    NOTIFICATIONS: '/users/notifications',
    PREFERENCES: '/users/preferences',
  },
  TRACKING: {
    LOCATION: '/tracking/location',
    ROUTE: '/tracking/route',
    ETA: '/tracking/eta',
  },
} as const;

