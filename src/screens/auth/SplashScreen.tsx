import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const SplashScreen: React.FC = () => {
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuthStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, [checkAuthStatus]);

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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    ...typography.heading1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    ...typography.body,
  },
});

export default SplashScreen;

