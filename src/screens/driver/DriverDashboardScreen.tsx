import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomMapView from '../../components/maps/CustomMapView';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useRide } from '../../hooks/useRide';
import { useLocation } from '../../hooks/useLocation';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const DriverDashboardScreen: React.FC = () => {
  const { activeRide, driverStatus, toggleDriverStatus } = useRide();
  const { currentLocation } = useLocation();
  const [isOnline, setIsOnline] = useState(driverStatus === 'online');

  useEffect(() => {
    setIsOnline(driverStatus === 'online');
  }, [driverStatus]);

  const handleToggleStatus = async () => {
    try {
      await toggleDriverStatus();
      setIsOnline(!isOnline);
    } catch (error) {
      console.error('Failed to toggle driver status:', error);
    }
  };

  const handleViewRequests = () => {
    // Navigate to ride requests screen
  };

  const handleViewEarnings = () => {
    // Navigate to earnings screen
  };

  const getStatusColor = () => {
    return isOnline ? colors.success : colors.gray;
  };

  const getStatusText = () => {
    return isOnline ? 'Online' : 'Offline';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMapView
          currentLocation={currentLocation || undefined}
          showDriverLocation={true}
        />
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statusSection}>
            <View style={styles.statusRow}>
              <View style={styles.statusInfo}>
                <Text style={styles.statusLabel}>Status</Text>
                <View style={styles.statusContainer}>
                  <Badge
                    text={getStatusText()}
                    color={getStatusColor()}
                    style={styles.statusBadge}
                  />
                </View>
              </View>
              <Button
                title={isOnline ? 'Go Offline' : 'Go Online'}
                onPress={handleToggleStatus}
                variant={isOnline ? 'outline' : 'primary'}
                style={styles.statusButton}
              />
            </View>
          </View>

          {activeRide && (
            <View style={styles.activeRideSection}>
              <Text style={styles.sectionTitle}>Active Ride</Text>
              <View style={styles.rideCard}>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideLabel}>Passenger:</Text>
                  <Text style={styles.rideValue}>{activeRide.passenger?.name}</Text>
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideLabel}>Pickup:</Text>
                  <Text style={styles.rideValue}>{activeRide.pickup}</Text>
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideLabel}>Destination:</Text>
                  <Text style={styles.rideValue}>{activeRide.destination}</Text>
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideLabel}>Fare:</Text>
                  <Text style={styles.rideValue}>KSh {activeRide.fare}</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <Button
                title="View Requests"
                onPress={handleViewRequests}
                variant="outline"
                style={styles.actionButton}
              />
              <Button
                title="View Earnings"
                onPress={handleViewEarnings}
                variant="outline"
                style={styles.actionButton}
              />
            </View>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Today's Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Rides</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>KSh 0</Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>0h</Text>
                <Text style={styles.statLabel}>Online Time</Text>
              </View>
            </View>
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
  statusSection: {
    marginBottom: spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    color: colors.gray,
    marginBottom: spacing.sm,
    ...typography.caption,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    marginRight: spacing.sm,
  },
  statusButton: {
    minWidth: 120,
  },
  activeRideSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  rideCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.lg,
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rideLabel: {
    color: colors.gray,
    ...typography.caption,
  },
  rideValue: {
    color: colors.darkColor,
    ...typography.caption,
  },
  quickActions: {
    marginBottom: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  statsSection: {
    marginBottom: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    color: colors.primary,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  statLabel: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.caption,
  },
});

export default DriverDashboardScreen;

