import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface BadgeProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline';
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  color = colors.white,
  backgroundColor = colors.primary,
  size = 'medium',
  variant = 'filled',
  onPress,
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    const baseStyle = styles.badge;
    const sizeStyle = styles[`${size}Badge`];
    const variantStyle = variant === 'outline' ? styles.outlineBadge : styles.filledBadge;
    const backgroundColorStyle = variant === 'filled' ? { backgroundColor } : {};
    const borderColorStyle = variant === 'outline' ? { borderColor: backgroundColor } : {};

    return [baseStyle, sizeStyle, variantStyle, backgroundColorStyle, borderColorStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = styles.badgeText;
    const sizeStyle = styles[`${size}Text`];
    const colorStyle = variant === 'outline' ? { color: backgroundColor } : { color };

    return [baseStyle, sizeStyle, colorStyle, textStyle];
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={getBadgeStyle()}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={getTextStyle()}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={getBadgeStyle()}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  // Sizes
  smallBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    minHeight: 20,
  },
  mediumBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 24,
  },
  largeBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 32,
  },
  // Variants
  filledBadge: {
    // Additional styles for filled variant
  },
  outlineBadge: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  // Text styles
  badgeText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    ...typography.caption,
    fontSize: 10,
  },
  mediumText: {
    ...typography.caption,
    fontSize: 12,
  },
  largeText: {
    ...typography.caption,
    fontSize: 14,
  },
});

export default Badge;
