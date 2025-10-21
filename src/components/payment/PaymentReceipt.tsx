import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface PaymentReceiptProps {
  ride: {
    id: string;
    pickup: string;
    destination: string;
    fare: number;
    distance: number;
    duration: number;
    driver: {
      name: string;
      phone: string;
    };
    completedAt: string;
  };
  paymentMethod: string;
  onRateDriver: () => void;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  ride,
  paymentMethod,
  onRateDriver,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case 'mpesa':
        return '📱';
      case 'cash':
        return '💵';
      case 'card':
        return '💳';
      default:
        return '💰';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Successful</Text>
          <Text style={styles.subtitle}>Thank you for using TeaRide</Text>
        </View>

        <Card style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptTitle}>Payment Receipt</Text>
            <Text style={styles.receiptId}>#{ride.id.slice(-8)}</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.sectionTitle}>Ride Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pickup:</Text>
              <Text style={styles.detailValue}>{ride.pickup}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Destination:</Text>
              <Text style={styles.detailValue}>{ride.destination}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Distance:</Text>
              <Text style={styles.detailValue}>{ride.distance} km</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration:</Text>
              <Text style={styles.detailValue}>{ride.duration} min</Text>
            </View>
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method:</Text>
              <Text style={styles.detailValue}>
                {getPaymentMethodIcon()} {paymentMethod.toUpperCase()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount Paid:</Text>
              <Text style={styles.detailValue}>KSh {ride.fare}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Completed At:</Text>
              <Text style={styles.detailValue}>{formatDate(ride.completedAt)}</Text>
            </View>
          </View>

          <View style={styles.driverInfo}>
            <Text style={styles.sectionTitle}>Driver Information</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Driver:</Text>
              <Text style={styles.detailValue}>{ride.driver.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{ride.driver.phone}</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid:</Text>
            <Text style={styles.totalValue}>KSh {ride.fare}</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Rate Driver"
            onPress={onRateDriver}
            style={styles.rateButton}
          />
          <Button
            title="Done"
            onPress={() => {}}
            variant="outline"
            style={styles.doneButton}
          />
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
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  receiptCard: {
    marginBottom: spacing.xl,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    ...typography.heading2,
  },
  receiptId: {
    fontSize: 14,
    color: colors.gray,
    ...typography.caption,
  },
  rideInfo: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
    ...typography.body,
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
  paymentInfo: {
    marginBottom: spacing.lg,
  },
  driverInfo: {
    marginBottom: spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    ...typography.heading2,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    ...typography.heading1,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  rateButton: {
    marginBottom: spacing.md,
  },
  doneButton: {
    // Additional styles if needed
  },
});

export default PaymentReceipt;

