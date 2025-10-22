import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to TeaRide',
      description: 'Book rides with trusted drivers in your area',
      image: require('../../assets/images/onboarding/ride.png'),
    },
    {
      title: 'Safe & Secure',
      description: 'All drivers are verified and rides are tracked in real-time',
      image: require('../../assets/images/onboarding/safety.png'),
    },
    {
      title: 'Easy Payments',
      description: 'Pay with M-Pesa or cash - your choice',
      image: require('../../assets/images/onboarding/payment.png'),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    // Navigate to login
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.slideContainer}>
          <View style={styles.imageContainer}>
            {/* Image would go here */}
            <View style={styles.placeholderImage} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{slides[currentSlide].title}</Text>
            <Text style={styles.description}>{slides[currentSlide].description}</Text>
          </View>
        </View>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleNext}
            style={styles.primaryButton}
          />
          <Button
            title="Skip"
            onPress={handleSkip}
            variant="outline"
            style={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.6,
    marginBottom: spacing.xl,
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    color: colors.darkColor,
    textAlign: 'center',
    marginBottom: spacing.md,
    ...typography.heading1,
  },
  description: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.body,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    paddingBottom: spacing.xl,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    // Additional styles if needed
  },
});

export default OnboardingScreen;

