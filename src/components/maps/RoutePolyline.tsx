import React from 'react';
import { Polyline } from 'react-native-maps';

interface RoutePolylineProps {
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
  strokeColor?: string;
  strokeWidth?: number;
  strokePattern?: number[];
}

const RoutePolyline: React.FC<RoutePolylineProps> = ({
  coordinates,
  strokeColor = '#007AFF',
  strokeWidth = 4,
  strokePattern,
}) => {
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      strokePattern={strokePattern}
    />
  );
};

export default RoutePolyline;

