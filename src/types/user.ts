export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
  isVerified: boolean;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    notifications: boolean;
    locationTracking: boolean;
    darkMode: boolean;
    language: string;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
  isVerified: boolean;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    notifications: boolean;
    locationTracking: boolean;
    darkMode: boolean;
    language: string;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  totalEarnings: number;
  totalSpent: number;
  averageRating: number;
  totalDistance: number;
  totalDuration: number;
  joinDate: string;
  lastRideDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ride' | 'payment' | 'promotion' | 'system';
  read: boolean;
  createdAt: string;
  data?: {
    rideId?: string;
    paymentId?: string;
    url?: string;
  };
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  responses?: Array<{
    id: string;
    message: string;
    isFromUser: boolean;
    createdAt: string;
  }>;
}

export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    rideUpdates: boolean;
    promotions: boolean;
  };
  privacy: {
    shareLocation: boolean;
    sharePhone: boolean;
    shareRating: boolean;
  };
  app: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    currency: string;
    units: 'metric' | 'imperial';
  };
  driver: {
    autoAccept: boolean;
    maxDistance: number;
    workingHours: {
      start: string;
      end: string;
      days: number[];
    };
  };
}

