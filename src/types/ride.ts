export type RideStatus = 'requested' | 'accepted' | 'arrived' | 'started' | 'completed' | 'cancelled';
export type RideType = 'standard' | 'comfort' | 'premium';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  location: Location;
  vehicle: {
    make: string;
    model: string;
    color: string;
    plateNumber: string;
    year: number;
  };
  isOnline: boolean;
}

export interface Passenger {
  id: string;
  name: string;
  phone: string;
  rating: number;
  location: Location;
}

export interface RideRequest {
  pickup: string;
  destination: string;
  rideType: RideType;
  estimatedFare?: number;
  notes?: string;
}

export interface Ride {
  id: string;
  status: RideStatus;
  pickup: string;
  destination: string;
  rideType: RideType;
  fare: number;
  distance: number;
  duration: number;
  driver?: Driver;
  passenger?: Passenger;
  route?: Location[];
  requestedAt: string;
  acceptedAt?: string;
  arrivedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  rating?: {
    passengerRating?: number;
    driverRating?: number;
    passengerComment?: string;
    driverComment?: string;
  };
  payment?: {
    method: string;
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
  };
}

export interface RideUpdate {
  rideId: string;
  status: RideStatus;
  location?: Location;
  timestamp: string;
}

export interface RideEstimate {
  distance: number;
  duration: number;
  fare: number;
  breakdown: {
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    surgeMultiplier: number;
  };
}

export interface RideHistory {
  rides: Ride[];
  total: number;
  page: number;
  limit: number;
}

export interface RideStats {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  totalEarnings: number;
  averageRating: number;
  totalDistance: number;
  totalDuration: number;
}

