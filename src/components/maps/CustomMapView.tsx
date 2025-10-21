import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { DriverMarker } from './DriverMarker';
import { RoutePolyline } from './RoutePolyline';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

interface CustomMapViewProps {
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  pickupLocation?: string;
  destinationLocation?: string;
  driverLocation?: {
    latitude: number;
    longitude: number;
  };
  route?: Array<{
    latitude: number;
    longitude: number;
  }>;
  showDriverLocation?: boolean;
  style?: any;
}

const CustomMapView: React.FC<CustomMapViewProps> = ({
  currentLocation,
  pickupLocation,
  destinationLocation,
  driverLocation,
  route,
  showDriverLocation = false,
  style,
}) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [currentLocation]);

  const getInitialRegion = () => {
    if (currentLocation) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    
    // Default to Nairobi, Kenya
    return {
      latitude: -1.2921,
      longitude: 36.8219,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={getInitialRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        userInterfaceStyle="light"
      >
        {/* Current location marker */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Your Location"
            description="Current location"
            pinColor={colors.primary}
          />
        )}

        {/* Driver location marker */}
        {driverLocation && (
          <DriverMarker
            coordinate={driverLocation}
            title="Driver"
            description="Your driver"
          />
        )}

        {/* Route polyline */}
        {route && route.length > 0 && (
          <RoutePolyline
            coordinates={route}
            strokeColor={colors.primary}
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomMapView;

