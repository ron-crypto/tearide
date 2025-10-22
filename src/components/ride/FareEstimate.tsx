import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface FareEstimateProps {
  pickup: string;
  destination: string;
  rideType: string;
  estimatedFare?: number;
  distance?: number;
  duration?: number;
  style?: any;
}

const FareEstimate: React.FC<FareEstimateProps> = ({
  pickup,
  destination,
  rideType,
  estimatedFare = 150,
  distance = 5.2,
  duration = 15,
  style,
}) => {
  const getRideTypeColor = () => {
    switch (rideType) {
      case 'standard':
        return colors.primary;
      case 'comfort':
        return colors.success;
      case 'premium':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.title}>Fare Estimate</Text>
      
      <View style={styles.routeInfo}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.success }]} />
          <Text style={styles.locationText}>{pickup}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.locationText}>{destination}</Text>
        </View>
      </View>

      <View style={styles.estimateDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance:</Text>
          <Text style={styles.detailValue}>{distance} km</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration:</Text>
          <Text style={styles.detailValue}>{duration} min</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ride Type:</Text>
          <Text style={[styles.detailValue, { color: getRideTypeColor() }]}>
            {rideType.charAt(0).toUpperCase() + rideType.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Estimated Fare:</Text>
        <Text style={styles.fareValue}>KSh {estimatedFare}</Text>
      </View>

      <Text style={styles.disclaimer}>
        *Final fare may vary based on traffic and route conditions
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // Additional container styles if needed
  },
  title: {
    color: colors.darkColor,
    marginBottom: spacing.lg,
    ...typography.heading2,
  },
  routeInfo: {
    marginBottom: spacing.lg,
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
  estimateDetails: {
    marginBottom: spacing.lg,
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
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  fareLabel: {
    color: colors.darkColor,
    ...typography.body,
  },
  fareValue: {
    color: colors.primary,
    ...typography.heading2,
  },
  disclaimer: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: spacing.md,
    ...typography.caption,
  },
});

export default FareEstimate;

