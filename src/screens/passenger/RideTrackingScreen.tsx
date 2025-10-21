import React, { useEffect, useState } from 'react';
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

const RideTrackingScreen: React.FC = () => {
  const { activeRide, cancelRide, completeRide } = useRide();
  const { currentLocation } = useLocation();
  const [rideStatus, setRideStatus] = useState<string>('requested');

  useEffect(() => {
    if (activeRide) {
      setRideStatus(activeRide.status);
    }
  }, [activeRide]);

  const handleCancelRide = async () => {
    try {
      await cancelRide();
    } catch (error) {
      console.error('Failed to cancel ride:', error);
    }
  };

  const handleContactDriver = () => {
    // Implement contact driver functionality
  };

  const handleCompleteRide = async () => {
    try {
      await completeRide();
    } catch (error) {
      console.error('Failed to complete ride:', error);
    }
  };

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'requested':
        return 'Looking for a driver...';
      case 'accepted':
        return 'Driver is on the way';
      case 'arrived':
        return 'Driver has arrived';
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
      case 'requested':
        return colors.warning;
      case 'accepted':
        return colors.info;
      case 'arrived':
        return colors.success;
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
          driverLocation={activeRide.driver?.location}
          route={activeRide.route}
        />
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statusSection}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusMessage()}</Text>
          </View>

          {activeRide.driver && (
            <DriverInfoCard
              driver={activeRide.driver}
              onContact={handleContactDriver}
              style={styles.driverInfo}
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
              <Text style={styles.detailLabel}>Estimated Fare:</Text>
              <Text style={styles.detailValue}>{activeRide.estimatedFare}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            {rideStatus === 'requested' && (
              <Button
                title="Cancel Ride"
                onPress={handleCancelRide}
                variant="outline"
                style={styles.cancelButton}
              />
            )}
            
            {rideStatus === 'arrived' && (
              <Button
                title="Start Ride"
                onPress={handleCompleteRide}
                style={styles.startButton}
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
    shadowColor: colors.dark,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.md,
    ...typography.heading1,
  },
  emptyMessage: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    ...typography.body,
  },
  driverInfo: {
    marginBottom: spacing.lg,
  },
  rideDetails: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray,
    ...typography.caption,
  },
  detailValue: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '500',
    ...typography.caption,
  },
  actionButtons: {
    marginBottom: spacing.xl,
  },
  cancelButton: {
    marginBottom: spacing.md,
  },
  startButton: {
    marginBottom: spacing.md,
  },
});

export default RideTrackingScreen;

