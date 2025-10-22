import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomMapView } from '../../components/maps/CustomMapView';
import { DriverInfoCard } from '../../components/ride/DriverInfoCard';
import { Button } from '../../components/common/Button';
import { useRide } from '../../hooks/useRide';
import { useLocation } from '../../hooks/useLocation';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const ActiveRideScreen: React.FC = () => {
  const { activeRide, updateRideStatus, completeRide } = useRide();
  const { currentLocation } = useLocation();
  const [rideStatus, setRideStatus] = useState<string>('accepted');

  useEffect(() => {
    if (activeRide) {
      setRideStatus(activeRide.status);
    }
  }, [activeRide]);

  const handleArrive = async () => {
    try {
      await updateRideStatus('arrived');
      setRideStatus('arrived');
    } catch (error) {
      console.error('Failed to update ride status:', error);
    }
  };

  const handleStartRide = async () => {
    try {
      await updateRideStatus('started');
      setRideStatus('started');
    } catch (error) {
      console.error('Failed to start ride:', error);
    }
  };

  const handleCompleteRide = async () => {
    try {
      await completeRide();
    } catch (error) {
      console.error('Failed to complete ride:', error);
    }
  };

  const handleContactPassenger = () => {
    // Implement contact passenger functionality
  };

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'accepted':
        return 'Navigate to pickup location';
      case 'arrived':
        return 'Passenger is coming';
      case 'started':
        return 'Ride in progress';
      case 'completed':
        return 'Ride completed';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'accepted':
        return colors.info;
      case 'arrived':
        return colors.warning;
      case 'started':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.gray;
    }
  };

  if (!activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Active Ride</Text>
          <Text style={styles.emptyMessage}>
            You don't have any active rides at the moment.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMapView
          currentLocation={currentLocation}
          pickupLocation={activeRide.pickup}
          destinationLocation={activeRide.destination}
          route={activeRide.route}
        />
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statusSection}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusMessage()}</Text>
          </View>

          {activeRide.passenger && (
            <DriverInfoCard
              driver={activeRide.passenger}
              onContact={handleContactPassenger}
              style={styles.passengerInfo}
            />
          )}

          <View style={styles.rideDetails}>
            <Text style={styles.sectionTitle}>Ride Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pickup:</Text>
              <Text style={styles.detailValue}>{activeRide.pickup}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Destination:</Text>
              <Text style={styles.detailValue}>{activeRide.destination}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ride Type:</Text>
              <Text style={styles.detailValue}>{activeRide.rideType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fare:</Text>
              <Text style={styles.detailValue}>KSh {activeRide.fare}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            {rideStatus === 'accepted' && (
              <Button
                title="I've Arrived"
                onPress={handleArrive}
                style={styles.actionButton}
              />
            )}
            
            {rideStatus === 'arrived' && (
              <Button
                title="Start Ride"
                onPress={handleStartRide}
                style={styles.actionButton}
              />
            )}
            
            {rideStatus === 'started' && (
              <Button
                title="Complete Ride"
                onPress={handleCompleteRide}
                style={styles.actionButton}
              />
            )}
          </View>
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading1,
  },
  emptyMessage: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.body,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  statusText: {
    color: colors.darkColor,
    ...typography.body,
  },
  passengerInfo: {
    marginBottom: spacing.lg,
  },
  rideDetails: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    color: colors.gray,
    ...typography.caption,
  },
  detailValue: {
    color: colors.darkColor,
    ...typography.caption,
  },
  actionButtons: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
});

export default ActiveRideScreen;

