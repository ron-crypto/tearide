import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../common/Input';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface LocationPickerProps {
  label?: string;
  placeholder?: string;
  value: string;
  onLocationSelect: (location: string) => void;
  style?: any;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  label,
  placeholder = 'Choose location',
  value,
  onLocationSelect,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationPress = () => {
    setIsOpen(true);
    // Implement location picker logic
    // This would typically open a map or search interface
  };

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onLocationSelect}
        rightIcon="location"
        onRightIconPress={handleLocationPress}
        editable={false}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Additional container styles if needed
  },
  input: {
    // Additional input styles if needed
  },
});

export default LocationPicker;

