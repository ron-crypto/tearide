import client from './client';

export interface DriverStatus {
  is_online: boolean;
  status: string;
  last_active: string;
  current_location?: {
    latitude: number;
    longitude: number;
  };
}

export interface DriverEarnings {
  period: string;
  total_earnings: number;
  total_rides: number;
  average_earnings_per_ride: number;
  breakdown: Record<string, any>;
  currency: string;
}

export interface RideRequest {
  id: string;
  passenger_name: string;
  passenger_phone: string;
  pickup_address: string;
  destination_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_type: string;
  fare: number;
  distance: number;
  estimated_duration: number;
  requested_at: string;
  notes?: string;
}

export interface DriverStats {
  total_rides: number;
  completed_rides: number;
  cancelled_rides: number;
  total_earnings: number;
  average_rating: number;
  total_online_hours: number;
  today_rides: number;
  today_earnings: number;
  this_week_rides: number;
  this_week_earnings: number;
  this_month_rides: number;
  this_month_earnings: number;
}

export const driversAPI = {
  // Toggle driver status
  toggleDriverStatus: async (status: 'online' | 'offline'): Promise<DriverStatus> => {
    const response = await client.put('/drivers/status', { status });
    return response.data;
  },

  // Get driver status
  getDriverStatus: async (): Promise<DriverStatus> => {
    const response = await client.get('/drivers/status');
    return response.data;
  },

  // Get ride requests
  getRideRequests: async (): Promise<RideRequest[]> => {
    const response = await client.get('/drivers/requests');
    return response.data;
  },

  // Accept ride request
  acceptRideRequest: async (rideId: string): Promise<void> => {
    await client.post(`/drivers/requests/${rideId}/accept`);
  },

  // Reject ride request
  rejectRideRequest: async (rideId: string, reason?: string): Promise<void> => {
    await client.post(`/drivers/requests/${rideId}/reject`, { reason });
  },

  // Get driver earnings
  getDriverEarnings: async (period: 'today' | 'week' | 'month' | 'year' = 'today'): Promise<DriverEarnings> => {
    const response = await client.get('/drivers/earnings', {
      params: { period }
    });
    return response.data;
  },

  // Get driver stats
  getDriverStats: async (): Promise<DriverStats> => {
    const response = await client.get('/drivers/stats');
    return response.data;
  },

  // Get active rides
  getActiveRides: async (): Promise<any[]> => {
    const response = await client.get('/drivers/active-rides');
    return response.data;
  },

  // Get driver ride history
  getDriverRideHistory: async (page: number = 1, limit: number = 20): Promise<any[]> => {
    const response = await client.get('/drivers/ride-history', {
      params: { page, limit }
    });
    return response.data;
  },
};
