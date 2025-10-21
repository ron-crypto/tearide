import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import * as Location from 'expo-location';
import { trackingAPI } from '../api/tracking';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  isTracking: boolean;
  hasPermission: boolean;
  error: string | null;
}

interface LocationContextType extends LocationState {
  startTracking: () => Promise<void>;
  stopTracking: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  updateLocation: (location: { latitude: number; longitude: number }) => Promise<void>;
  clearError: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

type LocationAction =
  | { type: 'LOCATION_START' }
  | { type: 'LOCATION_SUCCESS'; payload: { latitude: number; longitude: number } }
  | { type: 'LOCATION_FAILURE'; payload: string }
  | { type: 'LOCATION_CLEAR_ERROR' }
  | { type: 'LOCATION_SET_PERMISSION'; payload: boolean }
  | { type: 'LOCATION_SET_TRACKING'; payload: boolean };

const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
  switch (action.type) {
    case 'LOCATION_START':
      return {
        ...state,
        isTracking: true,
        error: null,
      };
    case 'LOCATION_SUCCESS':
      return {
        ...state,
        currentLocation: action.payload,
        isTracking: false,
        error: null,
      };
    case 'LOCATION_FAILURE':
      return {
        ...state,
        isTracking: false,
        error: action.payload,
      };
    case 'LOCATION_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'LOCATION_SET_PERMISSION':
      return {
        ...state,
        hasPermission: action.payload,
      };
    case 'LOCATION_SET_TRACKING':
      return {
        ...state,
        isTracking: action.payload,
      };
    default:
      return state;
  }
};

const initialState: LocationState = {
  currentLocation: null,
  isTracking: false,
  hasPermission: false,
  error: null,
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const hasPermission = status === 'granted';
      dispatch({ type: 'LOCATION_SET_PERMISSION', payload: hasPermission });
      return hasPermission;
    } catch (error: any) {
      dispatch({ type: 'LOCATION_FAILURE', payload: error.message || 'Failed to request location permission' });
      return false;
    }
  };

  const startTracking = async () => {
    try {
      if (!state.hasPermission) {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          dispatch({ type: 'LOCATION_FAILURE', payload: 'Location permission denied' });
          return;
        }
      }

      dispatch({ type: 'LOCATION_START' });

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      dispatch({ type: 'LOCATION_SUCCESS', payload: currentLocation });

      // Start watching position
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          dispatch({ type: 'LOCATION_SUCCESS', payload: newLocation });
        }
      );

      // Store subscription for cleanup
      (LocationProvider as any).subscription = subscription;
    } catch (error: any) {
      dispatch({ type: 'LOCATION_FAILURE', payload: error.message || 'Failed to start location tracking' });
    }
  };

  const stopTracking = async () => {
    try {
      if ((LocationProvider as any).subscription) {
        (LocationProvider as any).subscription.remove();
        (LocationProvider as any).subscription = null;
      }
      dispatch({ type: 'LOCATION_SET_TRACKING', payload: false });
    } catch (error: any) {
      dispatch({ type: 'LOCATION_FAILURE', payload: error.message || 'Failed to stop location tracking' });
    }
  };

  const updateLocation = async (location: { latitude: number; longitude: number }) => {
    try {
      dispatch({ type: 'LOCATION_SUCCESS', payload: location });
      
      // Update location on server
      await trackingAPI.updateDriverLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      dispatch({ type: 'LOCATION_FAILURE', payload: error.message || 'Failed to update location' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'LOCATION_CLEAR_ERROR' });
  };

  useEffect(() => {
    // Check initial permission status
    const checkPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        dispatch({ type: 'LOCATION_SET_PERMISSION', payload: status === 'granted' });
      } catch (error) {
        console.error('Error checking location permission:', error);
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if ((LocationProvider as any).subscription) {
        (LocationProvider as any).subscription.remove();
      }
    };
  }, []);

  const value: LocationContextType = {
    ...state,
    startTracking,
    stopTracking,
    requestPermission,
    updateLocation,
    clearError,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

