import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
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

  const handlePeriodChange = async (period: 'today' | 'week' | 'month') => {
    setSelectedPeriod(period);
    // Fetch earnings for the selected period
    try {
      await fetchEarningsForPeriod(period);
    } catch (error) {
      console.error('Failed to fetch earnings for period:', error);
    }
  };

  const fetchEarningsForPeriod = async (period: 'today' | 'week' | 'month') => {
    try {
      setRefreshing(true);
      await fetchEarnings(period);
      setRefreshing(false);
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
      setRefreshing(false);
    }
  };


  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Earnings</Text>
      <Text style={styles.emptyMessage}>
        Your earnings for this period will appear here.
      </Text>
    </View>
  );

  const getTotalEarnings = () => {
    if (earnings.length > 0 && earnings[0].total_earnings !== undefined) {
      return earnings[0].total_earnings;
    }
    return 0;
  };

  const getTotalRides = () => {
    if (earnings.length > 0 && earnings[0].total_rides !== undefined) {
      return earnings[0].total_rides;
    }
    return 0;
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
              color={selectedPeriod === 'today' ? colors.white : colors.darkColor}
              backgroundColor={selectedPeriod === 'today' ? colors.primary : colors.lightGray}
              onPress={() => handlePeriodChange('today')}
              style={styles.periodButton}
            />
            <Badge
              text="This Week"
              color={selectedPeriod === 'week' ? colors.white : colors.darkColor}
              backgroundColor={selectedPeriod === 'week' ? colors.primary : colors.lightGray}
              onPress={() => handlePeriodChange('week')}
              style={styles.periodButton}
            />
            <Badge
              text="This Month"
              color={selectedPeriod === 'month' ? colors.white : colors.darkColor}
              backgroundColor={selectedPeriod === 'month' ? colors.primary : colors.lightGray}
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

        {earnings.length > 0 && earnings[0].average_earnings_per_ride && (
          <View style={styles.summaryCards}>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Average per Ride</Text>
              <Text style={styles.summaryValue}>KSh {earnings[0].average_earnings_per_ride?.toFixed(2) || '0.00'}</Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Period</Text>
              <Text style={styles.summaryValue}>{earnings[0].period || 'N/A'}</Text>
            </Card>
          </View>
        )}

        <View style={styles.earningsList}>
          <Text style={styles.sectionTitle}>Earnings Summary</Text>
          {earnings.length > 0 ? (
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                You earned KSh {getTotalEarnings()} from {getTotalRides()} rides this {earnings[0].period || 'period'}.
              </Text>
              {earnings[0].breakdown && (
                <View style={styles.breakdownContainer}>
                  <Text style={styles.breakdownTitle}>Breakdown:</Text>
                  {Object.entries(earnings[0].breakdown).map(([key, value]) => (
                    <View key={key} style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>{key}:</Text>
                      <Text style={styles.breakdownValue}>KSh {String(value)}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
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
  summaryText: {
    color: colors.darkColor,
    textAlign: 'center',
    marginBottom: spacing.md,
    ...typography.body,
  },
  breakdownContainer: {
    marginTop: spacing.md,
  },
  breakdownTitle: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading3,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  breakdownLabel: {
    color: colors.gray,
    ...typography.caption,
  },
  breakdownValue: {
    color: colors.primary,
    ...typography.caption,
  },
});

export default EarningsScreen;

