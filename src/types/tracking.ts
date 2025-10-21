export interface LocationUpdate {
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  accuracy?: number;
  timestamp: string;
}

export interface TrackingData {
  rideId: string;
  driverLocation: LocationUpdate;
  passengerLocation: LocationUpdate;
  route: Array<{
    latitude: number;
    longitude: number;
  }>;
  distance: number;
  duration: number;
  eta: number;
  lastUpdated: string;
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Route {
  distance: number;
  duration: number;
  polyline: string;
  steps: RouteStep[];
}

export interface ETA {
  duration: number;
  distance: number;
  traffic: 'light' | 'moderate' | 'heavy';
}

export interface NearbyDriver {
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
}

export interface LocationIssue {
  type: 'inaccurate' | 'not_updating' | 'wrong_location';
  description: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  reportedAt: string;
}

