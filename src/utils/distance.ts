// Calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

// Convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Calculate ETA based on distance and average speed
export const calculateETA = (distance: number, averageSpeed: number = 30): number => {
  // Average speed in km/h, default to 30 km/h for city driving
  return (distance / averageSpeed) * 60; // Return in minutes
};

// Calculate fare based on distance and ride type
export const calculateFare = (
  distance: number,
  rideType: 'standard' | 'comfort' | 'premium',
  baseFare: number = 50,
  perKmRate: number = 20
): number => {
  const baseRates = {
    standard: { base: baseFare, perKm: perKmRate },
    comfort: { base: baseFare * 1.5, perKm: perKmRate * 1.3 },
    premium: { base: baseFare * 2, perKm: perKmRate * 1.5 },
  };
  
  const rate = baseRates[rideType];
  const fare = rate.base + (distance * rate.perKm);
  
  return Math.round(fare);
};

// Check if location is within service area
export const isWithinServiceArea = (
  latitude: number,
  longitude: number,
  serviceArea: {
    center: { latitude: number; longitude: number };
    radius: number; // in kilometers
  }
): boolean => {
  const distance = calculateDistance(
    latitude,
    longitude,
    serviceArea.center.latitude,
    serviceArea.center.longitude
  );
  
  return distance <= serviceArea.radius;
};

// Find nearest driver
export const findNearestDriver = (
  passengerLocation: { latitude: number; longitude: number },
  drivers: Array<{
    id: string;
    location: { latitude: number; longitude: number };
    status: string;
  }>
): {
  id: string;
  distance: number;
  eta: number;
} | null => {
  const availableDrivers = drivers.filter(driver => driver.status === 'online');
  
  if (availableDrivers.length === 0) return null;
  
  let nearestDriver = null;
  let minDistance = Infinity;
  
  for (const driver of availableDrivers) {
    const distance = calculateDistance(
      passengerLocation.latitude,
      passengerLocation.longitude,
      driver.location.latitude,
      driver.location.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestDriver = {
        id: driver.id,
        distance,
        eta: calculateETA(distance),
      };
    }
  }
  
  return nearestDriver;
};

// Calculate route distance (simplified)
export const calculateRouteDistance = (
  waypoints: Array<{ latitude: number; longitude: number }>
): number => {
  let totalDistance = 0;
  
  for (let i = 0; i < waypoints.length - 1; i++) {
    const distance = calculateDistance(
      waypoints[i].latitude,
      waypoints[i].longitude,
      waypoints[i + 1].latitude,
      waypoints[i + 1].longitude
    );
    totalDistance += distance;
  }
  
  return totalDistance;
};

// Get distance between two addresses (simplified)
export const getDistanceBetweenAddresses = async (
  address1: string,
  address2: string
): Promise<{
  distance: number;
  duration: number;
  route: Array<{ latitude: number; longitude: number }>;
}> => {
  // This would typically use a geocoding service and routing API
  // For now, return a mock response
  return {
    distance: 5.2,
    duration: 15,
    route: [
      { latitude: -1.2921, longitude: 36.8219 },
      { latitude: -1.3000, longitude: 36.8300 },
    ],
  };
};

// Calculate surge pricing
export const calculateSurgeMultiplier = (
  demand: number,
  supply: number,
  baseMultiplier: number = 1.0
): number => {
  if (supply === 0) return 3.0; // Maximum surge
  
  const ratio = demand / supply;
  
  if (ratio <= 1.0) return baseMultiplier;
  if (ratio <= 1.5) return 1.2;
  if (ratio <= 2.0) return 1.5;
  if (ratio <= 3.0) return 2.0;
  
  return 3.0; // Maximum surge
};

// Calculate final fare with surge pricing
export const calculateFinalFare = (
  baseFare: number,
  surgeMultiplier: number,
  taxes: number = 0,
  fees: number = 0
): number => {
  const surgeFare = baseFare * surgeMultiplier;
  const totalFare = surgeFare + taxes + fees;
  
  return Math.round(totalFare);
};

// Validate coordinates
export const isValidCoordinate = (
  latitude: number,
  longitude: number
): boolean => {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

// Get bounding box for map view
export const getBoundingBox = (
  locations: Array<{ latitude: number; longitude: number }>
): {
  north: number;
  south: number;
  east: number;
  west: number;
} => {
  if (locations.length === 0) {
    return {
      north: 0,
      south: 0,
      east: 0,
      west: 0,
    };
  }
  
  let north = locations[0].latitude;
  let south = locations[0].latitude;
  let east = locations[0].longitude;
  let west = locations[0].longitude;
  
  for (const location of locations) {
    north = Math.max(north, location.latitude);
    south = Math.min(south, location.latitude);
    east = Math.max(east, location.longitude);
    west = Math.min(west, location.longitude);
  }
  
  return { north, south, east, west };
};

