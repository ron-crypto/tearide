import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import PaymentMethodCard from '../../components/payment/PaymentMethodCard';
import MpesaPrompt from '../../components/payment/MpesaPrompt';
import PaymentReceipt from '../../components/payment/PaymentReceipt';
import { useRide } from '../../hooks/useRide';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const PaymentScreen: React.FC = () => {
  const { activeRide, processPayment } = useRide();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('mpesa');
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: 'phone-portrait' },
    { id: 'cash', name: 'Cash', icon: 'cash' },
    { id: 'card', name: 'Card', icon: 'card' },
  ];

  const handlePayment = async () => {
    if (selectedPaymentMethod === 'mpesa') {
      setShowMpesaPrompt(true);
    } else {
      try {
        await processPayment({
          method: selectedPaymentMethod,
          amount: activeRide?.fare || 0,
        });
        setPaymentCompleted(true);
      } catch (error) {
        Alert.alert('Payment Failed', 'Please try again.');
      }
    }
  };

  const handleMpesaPayment = async (phoneNumber: string) => {
    try {
      await processPayment({
        method: 'mpesa',
        amount: activeRide?.fare || 0,
        phoneNumber,
      });
      setShowMpesaPrompt(false);
      setPaymentCompleted(true);
    } catch (error) {
      Alert.alert('Payment Failed', 'Please check your phone number and try again.');
    }
  };

  const handleRateDriver = () => {
    // Navigate to rating screen
  };

  if (!activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Ride to Pay</Text>
          <Text style={styles.emptyMessage}>
            You don't have any completed rides to pay for.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (paymentCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <PaymentReceipt
          ride={{
            id: activeRide.id,
            pickup: activeRide.pickup,
            destination: activeRide.destination,
            fare: activeRide.fare,
            distance: activeRide.distance,
            duration: activeRide.duration,
            driver: {
              name: activeRide.driver?.name || '',
              phone: activeRide.driver?.phone || '',
            },
            completedAt: activeRide.completedAt || new Date().toISOString(),
          }}
          paymentMethod={selectedPaymentMethod}
          onRateDriver={handleRateDriver}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subtitle}>Complete your ride payment</Text>
        </View>

        <View style={styles.rideSummary}>
          <Text style={styles.sectionTitle}>Ride Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Distance:</Text>
            <Text style={styles.summaryValue}>{activeRide.distance} km</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>{activeRide.duration} min</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ride Type:</Text>
            <Text style={styles.summaryValue}>{activeRide.rideType}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Fare:</Text>
            <Text style={styles.totalValue}>KSh {activeRide.fare}</Text>
          </View>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              icon={method.icon}
              selected={selectedPaymentMethod === method.id}
              onSelect={setSelectedPaymentMethod}
              style={styles.paymentMethod}
            />
          ))}
        </View>

        <Button
          title="Pay Now"
          onPress={handlePayment}
          style={styles.payButton}
        />
      </ScrollView>

      {showMpesaPrompt && (
        <MpesaPrompt
          amount={activeRide.fare}
          onConfirm={handleMpesaPayment}
          onCancel={() => setShowMpesaPrompt(false)}
        />
      )}
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
    paddingTop: spacing.xl,
  },
  header: {
    alignItems: 'center',
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
  rideSummary: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: colors.gray,
    ...typography.caption,
  },
  summaryValue: {
    color: colors.darkColor,
    ...typography.caption,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  totalLabel: {
    color: colors.darkColor,
    ...typography.body,
  },
  totalValue: {
    color: colors.primary,
    ...typography.heading2,
  },
  paymentMethods: {
    marginBottom: spacing.xl,
  },
  paymentMethod: {
    marginBottom: spacing.sm,
  },
  payButton: {
    marginBottom: spacing.xl,
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
});

export default PaymentScreen;

