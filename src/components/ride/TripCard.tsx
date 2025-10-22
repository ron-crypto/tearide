import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface TripCardProps {
  trip: {
    id: string;
    date: string;
    pickup: string;
    destination: string;
    fare: number;
    status: 'completed' | 'cancelled' | 'in_progress';
    driver?: {
      name: string;
      rating: number;
    };
    rating?: number;
  };
  onPress?: () => void;
  style?: any;
}

const TripCard: React.FC<TripCardProps> = ({
  trip,
  onPress,
  style,
}) => {
  const getStatusColor = () => {
    switch (trip.status) {
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      case 'in_progress':
        return colors.warning;
      default:
        return colors.gray;
    }
  };

  const getStatusText = () => {
    switch (trip.status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripDate}>{trip.date}</Text>
            <Badge
              text={getStatusText()}
              color={getStatusColor()}
              style={styles.statusBadge}
            />
          </View>
          <Text style={styles.tripFare}>KSh {trip.fare}</Text>
        </View>

        <View style={styles.routeInfo}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, { backgroundColor: colors.success }]} />
            <Text style={styles.locationText}>{trip.pickup}</Text>
          </View>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.locationText}>{trip.destination}</Text>
          </View>
        </View>

        {trip.driver && (
          <View style={styles.driverInfo}>
            <Text style={styles.driverLabel}>Driver:</Text>
            <Text style={styles.driverName}>{trip.driver.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={colors.warning} />
              <Text style={styles.rating}>{trip.driver.rating.toFixed(1)}</Text>
            </View>
          </View>
        )}

        {trip.rating && (
          <View style={styles.ratingInfo}>
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= trip.rating! ? 'star' : 'star-outline'}
                  size={16}
                  color={colors.warning}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.tripId}>Trip #{trip.id.slice(-6)}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.gray} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Additional container styles if needed
  },
  card: {
    // Additional card styles if needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDate: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  statusBadge: {
    // Additional styles if needed
  },
  tripFare: {
    color: colors.primary,
    ...typography.heading2,
  },
  routeInfo: {
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
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  driverLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  driverName: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: colors.darkColor,
    marginLeft: spacing.sm,
    ...typography.caption,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  tripId: {
    color: colors.gray,
    ...typography.caption,
  },
});

export default TripCard;

