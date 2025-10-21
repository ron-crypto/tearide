import client from './client';
import { RideRequest, Ride, RideStatus, RideUpdate } from '../types/ride';

export const ridesAPI = {
  // Request a ride
  requestRide: async (rideData: RideRequest): Promise<Ride> => {
    const response = await client.post('/rides/request', rideData);
    return response.data;
  },

  // Get active ride
  getActiveRide: async (): Promise<Ride | null> => {
    const response = await client.get('/rides/active');
    return response.data;
  },

  // Update ride status
  updateRideStatus: async (rideId: string, status: RideStatus): Promise<Ride> => {
    const response = await client.put(`/rides/${rideId}/status`, { status });
    return response.data;
  },

  // Cancel ride
  cancelRide: async (rideId: string, reason?: string): Promise<void> => {
    await client.post(`/rides/${rideId}/cancel`, { reason });
  },

  // Complete ride
  completeRide: async (rideId: string): Promise<Ride> => {
    const response = await client.post(`/rides/${rideId}/complete`);
    return response.data;
  },

  // Get ride history
  getRideHistory: async (page: number = 1, limit: number = 20): Promise<{
    rides: Ride[];
    total: number;
    page: number;
    limit: number;
  }> => {
    const response = await client.get('/rides/history', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get ride details
  getRideDetails: async (rideId: string): Promise<Ride> => {
    const response = await client.get(`/rides/${rideId}`);
    return response.data;
  },

  // Rate ride
  rateRide: async (rideId: string, rating: number, comment?: string): Promise<void> => {
    await client.post(`/rides/${rideId}/rate`, {
      rating,
      comment,
    });
  },

  // Get available drivers
  getAvailableDrivers: async (location: {
    latitude: number;
    longitude: number;
  }): Promise<Array<{
    id: string;
    name: string;
    rating: number;
    distance: number;
    estimatedArrival: number;
    location: {
      latitude: number;
      longitude: number;
    };
  }>> => {
    const response = await client.get('/rides/available-drivers', {
      params: location,
    });
    return response.data;
  },

  // Get ride estimate
  getRideEstimate: async (pickup: string, destination: string, rideType: string): Promise<{
    distance: number;
    duration: number;
    fare: number;
    breakdown: {
      baseFare: number;
      distanceFare: number;
      timeFare: number;
      surgeMultiplier: number;
    };
  }> => {
    const response = await client.post('/rides/estimate', {
      pickup,
      destination,
      rideType,
    });
    return response.data;
  },
};

