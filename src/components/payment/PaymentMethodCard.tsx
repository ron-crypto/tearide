import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface PaymentMethodCardProps {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  onSelect: (id: string) => void;
  style?: any;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  id,
  name,
  icon,
  selected,
  onSelect,
  style,
}) => {
  const getIconColor = () => {
    return selected ? colors.primary : colors.gray;
  };

  const getCardColor = () => {
    return selected ? colors.lightPrimary : colors.white;
  };

  const getBorderColor = () => {
    return selected ? colors.primary : colors.lightGray;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getCardColor(),
          borderColor: getBorderColor(),
        },
        style,
      ]}
      onPress={() => onSelect(id)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={24}
            color={getIconColor()}
          />
        </View>

        <Text style={[styles.name, selected && styles.selectedText]}>
          {name}
        </Text>

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
    borderRadius: 12,
    marginBottom: spacing.sm,
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
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    ...typography.body,
  },
  selectedText: {
    color: colors.primary,
  },
  selectedIndicator: {
    // Additional styles if needed
  },
});

export default PaymentMethodCard;

