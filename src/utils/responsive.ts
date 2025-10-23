import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12/13/14 - 390x844)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * Get responsive width based on screen width
 */
export const getResponsiveWidth = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get responsive height based on screen height
 */
export const getResponsiveHeight = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get responsive font size
 */
export const getResponsiveFontSize = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Check if device has small screen
 */
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375 || SCREEN_HEIGHT < 667;
};

/**
 * Check if device has large screen
 */
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH > 414 || SCREEN_HEIGHT > 896;
};

/**
 * Get responsive padding based on screen size
 */
export const getResponsivePadding = (basePadding: number): number => {
  if (isSmallScreen()) {
    return basePadding * 0.8; // Reduce padding on small screens
  } else if (isLargeScreen()) {
    return basePadding * 1.2; // Increase padding on large screens
  }
  return basePadding;
};

/**
 * Get responsive margin based on screen size
 */
export const getResponsiveMargin = (baseMargin: number): number => {
  if (isSmallScreen()) {
    return baseMargin * 0.8; // Reduce margin on small screens
  } else if (isLargeScreen()) {
    return baseMargin * 1.2; // Increase margin on large screens
  }
  return baseMargin;
};
