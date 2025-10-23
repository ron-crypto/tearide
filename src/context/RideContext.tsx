import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { ridesAPI } from '../api/rides';
import { driversAPI } from '../api/drivers';
import { Ride, RideRequest, RideStatus } from '../types/ride';

interface RideState {
  activeRide: Ride | null;
  rideHistory: Ride[];
  rideRequests: Ride[];
  tripHistory: Ride[];
  earnings: any[];
  isLoading: boolean;
  isRequestingRide: boolean;
  error: string | null;
  driverStatus: 'online' | 'offline';
}

interface RideContextType extends RideState {
  requestRide: (rideData: RideRequest) => Promise<void>;
  cancelRide: () => Promise<void>;
  updateRideStatus: (status: RideStatus) => Promise<void>;
  completeRide: () => Promise<void>;
  fetchRideHistory: () => Promise<void>;
  fetchRideRequests: () => Promise<void>;
  fetchTripHistory: () => Promise<void>;
  fetchEarnings: () => Promise<void>;
  processPayment: (paymentData: any) => Promise<void>;
  acceptRide: (rideId: string) => Promise<void>;
  rejectRide: (rideId: string) => Promise<void>;
  toggleDriverStatus: () => Promise<void>;
  clearError: () => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

type RideAction =
  | { type: 'RIDE_START' }
  | { type: 'RIDE_SUCCESS'; payload: Ride }
  | { type: 'RIDE_FAILURE'; payload: string }
  | { type: 'RIDE_CLEAR_ERROR' }
  | { type: 'RIDE_SET_ACTIVE'; payload: Ride }
  | { type: 'RIDE_CLEAR_ACTIVE' }
  | { type: 'RIDE_SET_HISTORY'; payload: Ride[] }
  | { type: 'RIDE_SET_REQUESTS'; payload: Ride[] }
  | { type: 'RIDE_SET_TRIP_HISTORY'; payload: Ride[] }
  | { type: 'RIDE_SET_EARNINGS'; payload: any[] }
  | { type: 'RIDE_SET_REQUESTING'; payload: boolean }
  | { type: 'RIDE_SET_DRIVER_STATUS'; payload: 'online' | 'offline' };

const rideReducer = (state: RideState, action: RideAction): RideState => {
  switch (action.type) {
    case 'RIDE_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'RIDE_SUCCESS':
      return {
        ...state,
        activeRide: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'RIDE_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'RIDE_SET_ACTIVE':
      return {
        ...state,
        activeRide: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_CLEAR_ACTIVE':
      return {
        ...state,
        activeRide: null,
        isLoading: false,
        error: null,
      };
    case 'RIDE_SET_HISTORY':
      return {
        ...state,
        rideHistory: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_SET_REQUESTS':
      return {
        ...state,
        rideRequests: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_SET_TRIP_HISTORY':
      return {
        ...state,
        tripHistory: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_SET_EARNINGS':
      return {
        ...state,
        earnings: action.payload,
        isLoading: false,
        error: null,
      };
    case 'RIDE_SET_REQUESTING':
      return {
        ...state,
        isRequestingRide: action.payload,
      };
    case 'RIDE_SET_DRIVER_STATUS':
      return {
        ...state,
        driverStatus: action.payload,
      };
    default:
      return state;
  }
};

const initialState: RideState = {
  activeRide: null,
  rideHistory: [],
  rideRequests: [],
  tripHistory: [],
  earnings: [],
  isLoading: false,
  isRequestingRide: false,
  error: null,
  driverStatus: 'offline',
};

export const RideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rideReducer, initialState);

  const requestRide = async (rideData: RideRequest) => {
    try {
      dispatch({ type: 'RIDE_START' });
      dispatch({ type: 'RIDE_SET_REQUESTING', payload: true });
      const ride = await ridesAPI.requestRide(rideData);
      dispatch({ type: 'RIDE_SET_ACTIVE', payload: ride });
      dispatch({ type: 'RIDE_SET_REQUESTING', payload: false });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to request ride' });
      dispatch({ type: 'RIDE_SET_REQUESTING', payload: false });
      throw error;
    }
  };

  const cancelRide = useCallback(async () => {
    try {
      if (!state.activeRide) return;
      
      dispatch({ type: 'RIDE_START' });
      await ridesAPI.cancelRide(state.activeRide.id);
      dispatch({ type: 'RIDE_CLEAR_ACTIVE' });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to cancel ride' });
      throw error;
    }
  }, [state.activeRide]);

  const updateRideStatus = async (status: RideStatus) => {
    try {
      if (!state.activeRide) return;
      
      dispatch({ type: 'RIDE_START' });
      const updatedRide = await ridesAPI.updateRideStatus(state.activeRide.id, status);
      dispatch({ type: 'RIDE_SET_ACTIVE', payload: updatedRide });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to update ride status' });
      throw error;
    }
  };

  const completeRide = useCallback(async () => {
    try {
      if (!state.activeRide) return;
      
      dispatch({ type: 'RIDE_START' });
      const completedRide = await ridesAPI.completeRide(state.activeRide.id);
      dispatch({ type: 'RIDE_CLEAR_ACTIVE' });
      // Add to history
      dispatch({ type: 'RIDE_SET_HISTORY', payload: [completedRide, ...state.rideHistory] });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to complete ride' });
      throw error;
    }
  }, [state.activeRide, state.rideHistory]);

  const fetchRideHistory = useCallback(async () => {
    try {
      dispatch({ type: 'RIDE_START' });
      const response = await ridesAPI.getRideHistory();
      dispatch({ type: 'RIDE_SET_HISTORY', payload: response.rides });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to fetch ride history' });
      throw error;
    }
  }, []);

  const fetchRideRequests = useCallback(async () => {
    try {
      dispatch({ type: 'RIDE_START' });
      const response = await driversAPI.getRideRequests();
      dispatch({ type: 'RIDE_SET_REQUESTS', payload: response });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to fetch ride requests' });
      throw error;
    }
  }, []);

  const acceptRide = async (rideId: string) => {
    try {
      dispatch({ type: 'RIDE_START' });
      await driversAPI.acceptRideRequest(rideId);
      // Remove from requests and set as active
      const updatedRequests = state.rideRequests.filter(ride => ride.id !== rideId);
      dispatch({ type: 'RIDE_SET_REQUESTS', payload: updatedRequests });
      
      // You might want to fetch the ride details and set as active
      // const ride = await ridesAPI.getRideDetails(rideId);
      // dispatch({ type: 'RIDE_SET_ACTIVE', payload: ride });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to accept ride' });
      throw error;
    }
  };

  const rejectRide = async (rideId: string, reason?: string) => {
    try {
      dispatch({ type: 'RIDE_START' });
      await driversAPI.rejectRideRequest(rideId, reason);
      // Remove from requests
      const updatedRequests = state.rideRequests.filter(ride => ride.id !== rideId);
      dispatch({ type: 'RIDE_SET_REQUESTS', payload: updatedRequests });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to reject ride' });
      throw error;
    }
  };

  const toggleDriverStatus = useCallback(async () => {
    try {
      const newStatus = state.driverStatus === 'online' ? 'offline' : 'online';
      await driversAPI.toggleDriverStatus(newStatus);
      dispatch({ type: 'RIDE_SET_DRIVER_STATUS', payload: newStatus });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to update driver status' });
      throw error;
    }
  }, [state.driverStatus]);

  const fetchTripHistory = useCallback(async () => {
    try {
      dispatch({ type: 'RIDE_START' });
      const response = await ridesAPI.getRideHistory();
      dispatch({ type: 'RIDE_SET_TRIP_HISTORY', payload: response.rides });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to fetch trip history' });
      throw error;
    }
  }, []);

  const fetchEarnings = useCallback(async () => {
    try {
      dispatch({ type: 'RIDE_START' });
      const response = await driversAPI.getDriverEarnings('today');
      dispatch({ type: 'RIDE_SET_EARNINGS', payload: [response] });
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to fetch earnings' });
      throw error;
    }
  }, []);

  const processPayment = async (paymentData: any) => {
    try {
      dispatch({ type: 'RIDE_START' });
      // This would be implemented based on your backend API
      // const result = await ridesAPI.processPayment(paymentData);
      // Handle payment result
    } catch (error: any) {
      dispatch({ type: 'RIDE_FAILURE', payload: error.message || 'Failed to process payment' });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'RIDE_CLEAR_ERROR' });
  };

  // Removed automatic fetchRideHistory call to prevent infinite requests
  // Components should call fetchRideHistory manually when needed

  const value: RideContextType = {
    ...state,
    requestRide,
    cancelRide,
    updateRideStatus,
    completeRide,
    fetchRideHistory,
    fetchRideRequests,
    fetchTripHistory,
    fetchEarnings,
    processPayment,
    acceptRide,
    rejectRide,
    toggleDriverStatus,
    clearError,
  };

  return (
    <RideContext.Provider value={value}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = (): RideContextType => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
};

