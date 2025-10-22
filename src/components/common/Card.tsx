import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  shadow?: boolean;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  shadow = true,
  border = false,
}) => {
  const getCardStyle = () => {
    const baseStyle = styles.card;
    const shadowStyle = shadow ? styles.shadow : {};
    const borderStyle = border ? styles.border : {};

    return [baseStyle, shadowStyle, borderStyle, style];
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={getCardStyle()}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
  },
  shadow: {
    shadowColor: colors.darkColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
});

export default Card;

