import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useRide } from '../../hooks/useRide';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const EarningsScreen: React.FC = () => {
  const { earnings, fetchEarnings, isLoading } = useRide();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    fetchEarnings(selectedPeriod);
  }, [fetchEarnings, selectedPeriod]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEarnings(selectedPeriod);
    setRefreshing(false);
  };

  const handlePeriodChange = (period: 'today' | 'week' | 'month') => {
    setSelectedPeriod(period);
  };

  const renderEarningItem = ({ item }: { item: any }) => (
    <Card style={styles.earningCard}>
      <View style={styles.earningHeader}>
        <View style={styles.earningInfo}>
          <Text style={styles.earningDate}>{item.date}</Text>
          <Badge
            text={item.status}
            color={item.status === 'completed' ? colors.success : colors.warning}
            style={styles.statusBadge}
          />
        </View>
        <Text style={styles.earningAmount}>KSh {item.amount}</Text>
      </View>

      <View style={styles.earningDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ride ID:</Text>
          <Text style={styles.detailValue}>#{item.rideId.slice(-6)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance:</Text>
          <Text style={styles.detailValue}>{item.distance} km</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration:</Text>
          <Text style={styles.detailValue}>{item.duration} min</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Commission:</Text>
          <Text style={styles.detailValue}>KSh {item.commission}</Text>
        </View>
      </View>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Earnings</Text>
      <Text style={styles.emptyMessage}>
        Your earnings for this period will appear here.
      </Text>
    </View>
  );

  const getTotalEarnings = () => {
    return earnings.reduce((total, earning) => total + earning.amount, 0);
  };

  const getTotalRides = () => {
    return earnings.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
          <Text style={styles.subtitle}>Track your earnings and performance</Text>
        </View>

        <View style={styles.periodSelector}>
          <View style={styles.periodButtons}>
            <Badge
              text="Today"
              color={selectedPeriod === 'today' ? colors.primary : colors.lightGray}
              onPress={() => handlePeriodChange('today')}
              style={styles.periodButton}
            />
            <Badge
              text="This Week"
              color={selectedPeriod === 'week' ? colors.primary : colors.lightGray}
              onPress={() => handlePeriodChange('week')}
              style={styles.periodButton}
            />
            <Badge
              text="This Month"
              color={selectedPeriod === 'month' ? colors.primary : colors.lightGray}
              onPress={() => handlePeriodChange('month')}
              style={styles.periodButton}
            />
          </View>
        </View>

        <View style={styles.summaryCards}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
            <Text style={styles.summaryValue}>KSh {getTotalEarnings()}</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Rides</Text>
            <Text style={styles.summaryValue}>{getTotalRides()}</Text>
          </Card>
        </View>

        <View style={styles.earningsList}>
          <Text style={styles.sectionTitle}>Earnings History</Text>
          {earnings.length > 0 ? (
            earnings.map((earning) => (
              <Card key={earning.id} style={styles.earningCard}>
                <View style={styles.earningHeader}>
                  <View style={styles.earningInfo}>
                    <Text style={styles.earningDate}>{earning.date}</Text>
                    <Badge
                      text={earning.status}
                      color={earning.status === 'completed' ? colors.success : colors.warning}
                      style={styles.statusBadge}
                    />
                  </View>
                  <Text style={styles.earningAmount}>KSh {earning.amount}</Text>
                </View>

                <View style={styles.earningDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Ride ID:</Text>
                    <Text style={styles.detailValue}>#{earning.rideId.slice(-6)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Distance:</Text>
                    <Text style={styles.detailValue}>{earning.distance} km</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>{earning.duration} min</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Commission:</Text>
                    <Text style={styles.detailValue}>KSh {earning.commission}</Text>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            renderEmptyState()
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
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
  periodSelector: {
    marginBottom: spacing.xl,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  periodButton: {
    flex: 1,
  },
  summaryCards: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  summaryCard: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  summaryLabel: {
    color: colors.gray,
    marginBottom: spacing.sm,
    ...typography.caption,
  },
  summaryValue: {
    color: colors.primary,
    ...typography.heading1,
  },
  earningsList: {
    flex: 1,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  earningCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  earningInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningDate: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  statusBadge: {
    // Additional styles if needed
  },
  earningAmount: {
    color: colors.primary,
    ...typography.heading2,
  },
  earningDetails: {
    // Additional styles if needed
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
});

export default EarningsScreen;

