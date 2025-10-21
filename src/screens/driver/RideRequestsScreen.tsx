import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
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

  const renderRideRequest = ({ item }: { item: any }) => (
    <Card style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View style={styles.rideInfo}>
          <Text style={styles.rideId}>Ride #{item.id.slice(-6)}</Text>
          <Badge
            text={item.rideType}
            color={colors.primary}
            style={styles.rideTypeBadge}
          />
        </View>
        <Text style={styles.rideTime}>{item.requestedAt}</Text>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.success }]} />
          <Text style={styles.locationText}>{item.pickup}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.locationText}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <View style={styles.fareInfo}>
          <Text style={styles.fareLabel}>Fare:</Text>
          <Text style={styles.fareValue}>KSh {item.fare}</Text>
        </View>
        <View style={styles.distanceInfo}>
          <Text style={styles.distanceLabel}>Distance:</Text>
          <Text style={styles.distanceValue}>{item.distance} km</Text>
        </View>
      </View>

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
        keyExtractor={(item) => item.id}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  subtitle: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginRight: spacing.sm,
    ...typography.body,
  },
  rideTypeBadge: {
    // Additional styles if needed
  },
  rideTime: {
    fontSize: 12,
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
    fontSize: 14,
    color: colors.dark,
    flex: 1,
    ...typography.caption,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  fareInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 14,
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  fareValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    ...typography.body,
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceLabel: {
    fontSize: 14,
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  distanceValue: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '500',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.gray,
    ...typography.body,
  },
});

export default RideRequestsScreen;

