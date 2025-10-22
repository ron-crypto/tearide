// Primary colors
export const colors = {
  // Primary brand colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA6FF',
  lightPrimary: '#E6F3FF',
  
  // Secondary colors
  secondary: '#34C759',
  secondaryDark: '#28A745',
  secondaryLight: '#5DD679',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  darkColor: '#1C1C1E',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  mediumGray: '#C7C7CC',
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#E5E5EA',
  
  // Text colors
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  textInverse: '#FFFFFF',
  
  // Border colors
  border: '#C7C7CC',
  borderLight: '#E5E5EA',
  borderDark: '#8E8E93',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  
  // Gradient colors
  gradientPrimary: ['#007AFF', '#0056CC'],
  gradientSecondary: ['#34C759', '#28A745'],
  gradientWarning: ['#FF9500', '#FF6B00'],
  gradientError: ['#FF3B30', '#FF1A0A'],
  
  // Map colors
  mapPrimary: '#007AFF',
  mapSecondary: '#34C759',
  mapWarning: '#FF9500',
  mapError: '#FF3B30',
  
  // Ride type colors
  rideStandard: '#007AFF',
  rideComfort: '#34C759',
  ridePremium: '#FF9500',
  
  // Payment method colors
  mpesa: '#00A86B',
  cash: '#34C759',
  card: '#007AFF',
  wallet: '#FF9500',
  
  // Rating colors
  rating: '#FFD700',
  ratingEmpty: '#E5E5EA',
  
  // Status indicator colors
  statusOnline: '#34C759',
  statusOffline: '#8E8E93',
  statusBusy: '#FF9500',
  statusAway: '#FF3B30',
  
  // Notification colors
  notificationInfo: '#007AFF',
  notificationSuccess: '#34C759',
  notificationWarning: '#FF9500',
  notificationError: '#FF3B30',
  
  // Accessibility colors
  accessibility: {
    highContrast: '#000000',
    lowContrast: '#8E8E93',
    focus: '#007AFF',
    selected: '#007AFF',
  },
  
  // Dark mode colors
  dark: {
    background: '#1C1C1E',
    backgroundSecondary: '#2C2C2E',
    backgroundTertiary: '#3A3A3C',
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    textTertiary: '#6D6D70',
    border: '#3A3A3C',
    borderLight: '#2C2C2E',
    borderDark: '#6D6D70',
  },
} as const;

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'success':
    case 'completed':
    case 'online':
      return colors.success;
    case 'warning':
    case 'pending':
    case 'busy':
      return colors.warning;
    case 'error':
    case 'failed':
    case 'cancelled':
    case 'offline':
      return colors.error;
    case 'info':
    case 'active':
    case 'in_progress':
      return colors.info;
    default:
      return colors.gray;
  }
};

export const getRideTypeColor = (rideType: string): string => {
  switch (rideType.toLowerCase()) {
    case 'standard':
      return colors.rideStandard;
    case 'comfort':
      return colors.rideComfort;
    case 'premium':
      return colors.ridePremium;
    default:
      return colors.primary;
  }
};

export const getPaymentMethodColor = (method: string): string => {
  switch (method.toLowerCase()) {
    case 'mpesa':
      return colors.mpesa;
    case 'cash':
      return colors.cash;
    case 'card':
      return colors.card;
    case 'wallet':
      return colors.wallet;
    default:
      return colors.primary;
  }
};

