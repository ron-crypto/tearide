import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface RideOptionCardProps {
  id: string;
  name: string;
  price: string;
  estimatedTime: string;
  selected: boolean;
  onSelect: (id: string) => void;
  style?: any;
}

const RideOptionCard: React.FC<RideOptionCardProps> = ({
  id,
  name,
  price,
  estimatedTime,
  selected,
  onSelect,
  style,
}) => {
  const getIcon = () => {
    switch (id) {
      case 'standard':
        return 'car';
      case 'comfort':
        return 'car-sport';
      case 'premium':
        return 'diamond';
      default:
        return 'car';
    }
  };

  const getIconColor = () => {
    return selected ? colors.primary : colors.gray;
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer, style]}
      onPress={() => onSelect(id)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIcon() as any}
            size={24}
            color={getIconColor()}
          />
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, selected && styles.selectedText]}>
            {name}
          </Text>
          <Text style={styles.estimatedTime}>
            {estimatedTime}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, selected && styles.selectedText]}>
            {price}
          </Text>
        </View>

        {selected && (
          <View style={styles.selectedIndicator}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.primary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  selectedContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.lightPrimary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  estimatedTime: {
    fontSize: 14,
    color: colors.gray,
    ...typography.caption,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: spacing.md,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    ...typography.heading2,
  },
  selectedText: {
    color: colors.primary,
  },
  selectedIndicator: {
    // Additional styles if needed
  },
});

export default RideOptionCard;

