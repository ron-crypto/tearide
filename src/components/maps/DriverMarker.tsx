import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface DriverMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  driverName?: string;
  rating?: number;
}

const DriverMarker: React.FC<DriverMarkerProps> = ({
  coordinate,
  title,
  description,
  driverName,
  rating,
}) => {
  const renderCustomMarker = () => (
    <View style={styles.markerContainer}>
      <View style={styles.marker}>
        <View style={styles.markerInner}>
          <Text style={styles.markerText}>🚗</Text>
        </View>
      </View>
      {driverName && (
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driverName}</Text>
          {rating && (
            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={description}
    >
      {renderCustomMarker()}
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.darkColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 20,
  },
  driverInfo: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginTop: spacing.sm,
    shadowColor: colors.darkColor
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  driverName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkColor
    textAlign: 'center',
    ...typography.caption,
  },
  rating: {
    fontSize: 10,
    color: colors.gray,
    textAlign: 'center',
    ...typography.caption,
  },
});

export default DriverMarker;

