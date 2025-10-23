import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const SplashScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>TeaRide</Text>
      <Text style={styles.subtitle}>Your ride, your way</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: colors.primary,
    marginBottom: 8,
    fontFamily: typography.heading1.fontFamily,
    fontSize: typography.heading1.fontSize,
    lineHeight: typography.heading1.lineHeight,
    fontWeight: typography.heading1.fontWeight,
  },
  subtitle: {
    color: colors.gray,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
  },
});

export default SplashScreen;

