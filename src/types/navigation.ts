import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Stack Navigator
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  RideTracking: undefined;
  ActiveRide: undefined;
  Payment: undefined;
  Settings: undefined;
  Notifications: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  // Passenger tabs
  Home: undefined;
  History: undefined;
  Profile: undefined;
  
  // Driver tabs
  Dashboard: undefined;
  Requests: undefined;
  Earnings: undefined;
};

// Screen Props
export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: any;
  route: {
    params: RootStackParamList[T];
  };
}

// Navigation types for specific screens
export type SplashScreenProps = ScreenProps<'Splash'>;
export type OnboardingScreenProps = ScreenProps<'Onboarding'>;
export type LoginScreenProps = ScreenProps<'Login'>;
export type RegisterScreenProps = ScreenProps<'Register'>;
export type ForgotPasswordScreenProps = ScreenProps<'ForgotPassword'>;

export type HomeScreenProps = ScreenProps<'Home'>;
export type RideTrackingScreenProps = ScreenProps<'RideTracking'>;
export type PaymentScreenProps = ScreenProps<'Payment'>;
export type TripHistoryScreenProps = ScreenProps<'History'>;

export type DriverDashboardScreenProps = ScreenProps<'Dashboard'>;
export type ActiveRideScreenProps = ScreenProps<'ActiveRide'>;
export type RideRequestsScreenProps = ScreenProps<'Requests'>;
export type EarningsScreenProps = ScreenProps<'Earnings'>;

export type ProfileScreenProps = ScreenProps<'Profile'>;
export type SettingsScreenProps = ScreenProps<'Settings'>;
export type NotificationsScreenProps = ScreenProps<'Notifications'>;

