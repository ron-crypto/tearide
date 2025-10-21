import client from './client';
import { LocationUpdate, TrackingData } from '../types/tracking';

export const trackingAPI = {
  // Update driver location
  updateDriverLocation: async (location: LocationUpdate): Promise<void> => {
    await client.post('/tracking/driver/location', location);
  },

  // Update passenger location
  updatePassengerLocation: async (location: LocationUpdate): Promise<void> => {
    await client.post('/tracking/passenger/location', location);
  },

  // Get driver location
  getDriverLocation: async (driverId: string): Promise<{
    latitude: number;
    longitude: number;
    heading: number;
    speed: number;
    timestamp: string;
  }> => {
    const response = await client.get(`/tracking/driver/${driverId}/location`);
    return response.data;
  },

  // Get passenger location
  getPassengerLocation: async (passengerId: string): Promise<{
    latitude: number;
    longitude: number;
    timestamp: string;
  }> => {
    const response = await client.get(`/tracking/passenger/${passengerId}/location`);
    return response.data;
  },

  // Start ride tracking
  startRideTracking: async (rideId: string): Promise<void> => {
    await client.post(`/tracking/rides/${rideId}/start`);
  },

  // Stop ride tracking
  stopRideTracking: async (rideId: string): Promise<void> => {
    await client.post(`/tracking/rides/${rideId}/stop`);
  },

  // Get ride tracking data
  getRideTrackingData: async (rideId: string): Promise<TrackingData> => {
    const response = await client.get(`/tracking/rides/${rideId}`);
    return response.data;
  },

  // Get route between two points
  getRoute: async (origin: {
    latitude: number;
    longitude: number;
  }, destination: {
    latitude: number;
    longitude: number;
  }): Promise<{
    distance: number;
    duration: number;
    polyline: string;
    steps: Array<{
      instruction: string;
      distance: number;
      duration: number;
      location: {
        latitude: number;
        longitude: number;
      };
    }>;
  }> => {
    const response = await client.post('/tracking/route', {
      origin,
      destination,
    });
    return response.data;
  },

  // Get nearby drivers
  getNearbyDrivers: async (location: {
    latitude: number;
    longitude: number;
  }, radius: number = 5000): Promise<Array<{
    id: string;
    name: string;
    rating: number;
    distance: number;
    estimatedArrival: number;
    location: {
      latitude: number;
      longitude: number;
    };
    vehicle: {
      make: string;
      model: string;
      color: string;
      plateNumber: string;
    };
  }>> => {
    const response = await client.get('/tracking/drivers/nearby', {
      params: { ...location, radius },
    });
    return response.data;
  },

  // Get ETA
  getETA: async (origin: {
    latitude: number;
    longitude: number;
  }, destination: {
    latitude: number;
    longitude: number;
  }): Promise<{
    duration: number;
    distance: number;
    traffic: 'light' | 'moderate' | 'heavy';
  }> => {
    const response = await client.post('/tracking/eta', {
      origin,
      destination,
    });
    return response.data;
  },

  // Report location issue
  reportLocationIssue: async (issue: {
    type: 'inaccurate' | 'not_updating' | 'wrong_location';
    description: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  }): Promise<void> => {
    await client.post('/tracking/issues', issue);
  },
};

