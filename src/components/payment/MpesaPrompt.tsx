import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface MpesaPromptProps {
  amount: number;
  onConfirm: (phoneNumber: string) => void;
  onCancel: () => void;
  visible?: boolean;
}

const MpesaPrompt: React.FC<MpesaPromptProps> = ({
  amount,
  onConfirm,
  onCancel,
  visible = true,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!phoneNumber.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm(phoneNumber);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const digits = text.replace(/\D/g, '');
    
    // Format as Kenyan phone number
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>M-Pesa Payment</Text>
            <Text style={styles.subtitle}>
              Enter your phone number to receive payment request
            </Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount to Pay:</Text>
            <Text style={styles.amountValue}>KSh {amount}</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Phone Number"
              placeholder="0700 000 000"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={15}
            />

            <Text style={styles.disclaimer}>
              You will receive an M-Pesa prompt on your phone to complete the payment.
            </Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={onCancel}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title="Send Payment Request"
              onPress={handleConfirm}
              loading={isLoading}
              disabled={!phoneNumber.trim()}
              style={styles.confirmButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
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
    textAlign: 'center',
    ...typography.body,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  amountLabel: {
    color: colors.gray,
    marginBottom: spacing.sm,
    ...typography.caption,
  },
  amountValue: {
    color: colors.primary,
    ...typography.heading1,
  },
  form: {
    marginBottom: spacing.xl,
  },
  disclaimer: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: spacing.md,
    ...typography.caption,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});

export default MpesaPrompt;

