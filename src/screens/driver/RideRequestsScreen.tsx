import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useRide } from '../../hooks/useRide';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const RideRequestsScreen: React.FC = () => {
  const { rideRequests, fetchRideRequests, acceptRide, rejectRide, isLoading } = useRide();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRideRequests();
  }, [fetchRideRequests]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRideRequests();
    setRefreshing(false);
  };

  const handleAcceptRide = async (rideId: string) => {
    try {
      await acceptRide(rideId);
    } catch (error) {
      console.error('Failed to accept ride:', error);
    }
  };

  const handleRejectRide = async (rideId: string) => {
    try {
      await rejectRide(rideId);
    } catch (error) {
      console.error('Failed to reject ride:', error);
    }
  };

  const renderRideRequest = ({ item }: { item: any }) => {
    console.log('Rendering ride request item:', item);
    console.log('Item ID:', item.id, 'Type:', typeof item.id);
    return (
    <Card style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View style={styles.rideInfo}>
          <Text style={styles.rideId}>Ride #{item.id && typeof item.id === 'string' ? item.id.slice(-6) : 'N/A'}</Text>
          <Badge
            text={item.ride_type || 'Standard'}
            color={colors.white}
            backgroundColor={colors.primary}
            style={styles.rideTypeBadge}
          />
        </View>
        <Text style={styles.rideTime}>
          {item.requested_at ? new Date(item.requested_at).toLocaleTimeString() : 'N/A'}
        </Text>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.success }]} />
          <Text style={styles.locationText}>{item.pickup_address || 'Pickup location'}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.locationText}>{item.destination_address || 'Destination'}</Text>
        </View>
      </View>

      <View style={styles.passengerInfo}>
        <Text style={styles.passengerLabel}>Passenger:</Text>
        <Text style={styles.passengerName}>{item.passenger_name || 'Unknown'}</Text>
        <Text style={styles.passengerPhone}>{item.passenger_phone || 'N/A'}</Text>
      </View>

      <View style={styles.rideFooter}>
        <View style={styles.fareInfo}>
          <Text style={styles.fareLabel}>Fare:</Text>
          <Text style={styles.fareValue}>KSh {item.fare || 0}</Text>
        </View>
        <View style={styles.distanceInfo}>
          <Text style={styles.distanceLabel}>Distance:</Text>
          <Text style={styles.distanceValue}>{item.distance || 0} km</Text>
        </View>
        <View style={styles.durationInfo}>
          <Text style={styles.durationLabel}>Duration:</Text>
          <Text style={styles.durationValue}>{item.estimated_duration || 0} min</Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <Button
          title="Accept"
          onPress={() => handleAcceptRide(item.id)}
          style={styles.acceptButton}
        />
        <Button
          title="Reject"
          onPress={() => handleRejectRide(item.id)}
          variant="outline"
          style={styles.rejectButton}
        />
      </View>
    </Card>
  );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Ride Requests</Text>
      <Text style={styles.emptyMessage}>
        New ride requests will appear here when they become available.
      </Text>
    </View>
  );

  if (isLoading && rideRequests.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading ride requests...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ride Requests</Text>
        <Text style={styles.subtitle}>Available rides in your area</Text>
      </View>

      <FlatList
        data={rideRequests}
        renderItem={renderRideRequest}
        keyExtractor={(item) => item.id || Math.random().toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  subtitle: {
    color: colors.gray,
    ...typography.body,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  rideCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideId: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.body,
  },
  rideTypeBadge: {
    // Additional styles if needed
  },
  rideTime: {
    color: colors.gray,
    ...typography.caption,
  },
  rideDetails: {
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  locationText: {
    color: colors.darkColor,
    flex: 1,
    ...typography.caption,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  passengerInfo: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  passengerLabel: {
    color: colors.gray,
    marginBottom: spacing.xs,
    ...typography.caption,
  },
  passengerName: {
    color: colors.darkColor,
    marginBottom: spacing.xs,
    ...typography.body,
  },
  passengerPhone: {
    color: colors.gray,
    ...typography.caption,
  },
  durationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  durationValue: {
    color: colors.darkColor,
    ...typography.caption,
  },
  notesContainer: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  notesLabel: {
    color: colors.gray,
    marginBottom: spacing.xs,
    ...typography.caption,
  },
  notesText: {
    color: colors.darkColor,
    ...typography.caption,
  },
  fareInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  fareValue: {
    color: colors.primary,
    ...typography.body,
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  distanceValue: {
    color: colors.darkColor,
    ...typography.caption,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  acceptButton: {
    flex: 1,
  },
  rejectButton: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.gray,
    ...typography.body,
  },
});

export default RideRequestsScreen;

