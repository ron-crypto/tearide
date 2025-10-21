import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../styles/colors';
import { MainTabParamList, MainStackParamList } from '../types/navigation';

// Import screens
// Passenger screens
import HomeScreen from '../screens/passenger/HomeScreen';
import RideTrackingScreen from '../screens/passenger/RideTrackingScreen';
import PaymentScreen from '../screens/passenger/PaymentScreen';
import TripHistoryScreen from '../screens/passenger/TripHistoryScreen';

// Driver screens
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import ActiveRideScreen from '../screens/driver/ActiveRideScreen';
import RideRequestsScreen from '../screens/driver/RideRequestsScreen';
import EarningsScreen from '../screens/driver/EarningsScreen';

// Shared screens
import ProfileScreen from '../screens/shared/ProfileScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const PassengerTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'History') {
          iconName = focused ? 'time' : 'time-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else {
          iconName = 'help-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="History" component={TripHistoryScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const DriverTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'car' : 'car-outline';
        } else if (route.name === 'Requests') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Earnings') {
          iconName = focused ? 'cash' : 'cash-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else {
          iconName = 'help-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={DriverDashboardScreen} />
    <Tab.Screen name="Requests" component={RideRequestsScreen} />
    <Tab.Screen name="Earnings" component={EarningsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const MainNavigator: React.FC = () => {
  const { user } = useAuth();
  const isDriver = user?.role === 'driver';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Tabs" 
        component={isDriver ? DriverTabs : PassengerTabs} 
      />
      <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
      <Stack.Screen name="ActiveRide" component={ActiveRideScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

