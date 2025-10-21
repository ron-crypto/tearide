import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface DriverInfoCardProps {
  driver: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicle: {
      make: string;
      model: string;
      color: string;
      plateNumber: string;
    };
    location?: {
      latitude: number;
      longitude: number;
    };
  };
  onContact?: () => void;
  style?: any;
}

const DriverInfoCard: React.FC<DriverInfoCardProps> = ({
  driver,
  onContact,
  style,
}) => {
  const handleCall = () => {
    // Implement call functionality
  };

  const handleMessage = () => {
    // Implement message functionality
  };

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.rating}>{driver.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.contactButtons}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleCall}
          >
            <Ionicons name="call" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleMessage}
          >
            <Ionicons name="chatbubble" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleTitle}>Vehicle Information</Text>
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleText}>
            {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
          </Text>
          <Text style={styles.plateText}>
            {driver.vehicle.plateNumber}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Contact Driver"
          onPress={onContact}
          variant="outline"
          style={styles.contactButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // Additional container styles if needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.heading2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.dark,
    marginLeft: spacing.sm,
    ...typography.caption,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    marginBottom: spacing.lg,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  vehicleDetails: {
    // Additional styles if needed
  },
  vehicleText: {
    fontSize: 14,
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.caption,
  },
  plateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    ...typography.caption,
  },
  actions: {
    // Additional styles if needed
  },
});

export default DriverInfoCard;

