import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomMapView from '../../components/maps/CustomMapView';
import LocationPicker from '../../components/maps/LocationPicker';
import RideOptionCard from '../../components/ride/RideOptionCard';
import FareEstimate from '../../components/ride/FareEstimate';
import Button from '../../components/common/Button';
import { useLocation } from '../../hooks/useLocation';
import { useRide } from '../../hooks/useRide';
import { RideType } from '../../types/ride';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const HomeScreen: React.FC = () => {
  const { currentLocation } = useLocation();
  const { requestRide, isRequestingRide } = useRide();
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [destinationLocation, setDestinationLocation] = useState<string>('');
  const [selectedRideType, setSelectedRideType] = useState<RideType>('standard');

  const handleRideTypeSelect = (id: string) => {
    setSelectedRideType(id as RideType);
  };

  const rideOptions = [
    { id: 'standard', name: 'Standard', price: 'KSh 150', estimatedTime: '5 min' },
    { id: 'comfort', name: 'Comfort', price: 'KSh 200', estimatedTime: '7 min' },
    { id: 'premium', name: 'Premium', price: 'KSh 300', estimatedTime: '10 min' },
  ];

  const handleRequestRide = async () => {
    if (!pickupLocation || !destinationLocation) {
      return;
    }

    try {
      await requestRide({
        pickup: pickupLocation,
        destination: destinationLocation,
        rideType: selectedRideType,
      });
    } catch (error) {
      console.error('Failed to request ride:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMapView
          currentLocation={currentLocation || undefined}
          pickupLocation={pickupLocation}
          destinationLocation={destinationLocation}
        />
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Where to?</Text>
            
            <LocationPicker
              label="Pickup"
              placeholder="Choose pickup location"
              value={pickupLocation}
              onLocationSelect={setPickupLocation}
              style={styles.locationPicker}
            />
            
            <LocationPicker
              label="Destination"
              placeholder="Choose destination"
              value={destinationLocation}
              onLocationSelect={setDestinationLocation}
              style={styles.locationPicker}
            />
          </View>

          {pickupLocation && destinationLocation && (
            <>
              <View style={styles.rideOptionsSection}>
                <Text style={styles.sectionTitle}>Choose your ride</Text>
                {rideOptions.map((option) => (
                  <RideOptionCard
                    key={option.id}
                    id={option.id}
                    name={option.name}
                    price={option.price}
                    estimatedTime={option.estimatedTime}
                    selected={selectedRideType === option.id}
                    onSelect={handleRideTypeSelect}
                    style={styles.rideOption}
                  />
                ))}
              </View>

              <FareEstimate
                pickup={pickupLocation}
                destination={destinationLocation}
                rideType={selectedRideType}
                style={styles.fareEstimate}
              />

              <Button
                title="Request Ride"
                onPress={handleRequestRide}
                loading={isRequestingRide}
                disabled={!pickupLocation || !destinationLocation}
                style={styles.requestButton}
              />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapContainer: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    shadowColor: colors.darkColor,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  locationSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  locationPicker: {
    marginBottom: spacing.md,
  },
  rideOptionsSection: {
    marginBottom: spacing.lg,
  },
  rideOption: {
    marginBottom: spacing.sm,
  },
  fareEstimate: {
    marginBottom: spacing.lg,
  },
  requestButton: {
    marginBottom: spacing.xl,
  },
});

export default HomeScreen;

