import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TripCard from '../../components/ride/TripCard';
import Loading from '../../components/common/Loading';
import { useRide } from '../../hooks/useRide';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const TripHistoryScreen: React.FC = () => {
  const { tripHistory, fetchTripHistory, isLoading } = useRide();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTripHistory();
  }, [fetchTripHistory]); // Now safe to include fetchTripHistory since it's wrapped with useCallback

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTripHistory();
    setRefreshing(false);
  };

  const handleTripPress = (trip: any) => {
    // Navigate to trip details
  };

  const renderTrip = ({ item }: { item: any }) => (
    <TripCard
      trip={item}
      onPress={() => handleTripPress(item)}
      style={styles.tripCard}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>🚗</Text>
      </View>
      <Text style={styles.emptyTitle}>No Trip History Yet</Text>
      <Text style={styles.emptyMessage}>
        Your completed rides will appear here once you start using TeaRide.
      </Text>
      <View style={styles.emptyActionContainer}>
        <Text style={styles.emptyActionText}>
          Ready to book your first ride? 🎉
        </Text>
      </View>
    </View>
  );

  if (isLoading && tripHistory.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trip History</Text>
        <Text style={styles.subtitle}>Your completed rides</Text>
      </View>

      <FlatList
        data={tripHistory}
        renderItem={renderTrip}
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
    alignItems: 'center',
  },
  title: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading1,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.gray,
    ...typography.body,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  tripCard: {
    marginBottom: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading1,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptyMessage: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  emptyActionContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyActionText: {
    color: colors.white,
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TripHistoryScreen;

