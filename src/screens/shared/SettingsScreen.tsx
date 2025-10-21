import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoAccept, setAutoAccept] = useState(false);

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    if (!value) {
      Alert.alert(
        'Notifications Disabled',
        'You will not receive ride updates and notifications.'
      );
    }
  };

  const handleLocationToggle = (value: boolean) => {
    setLocationTracking(value);
    if (!value) {
      Alert.alert(
        'Location Tracking Disabled',
        'Location tracking is required for ride requests and driver matching.'
      );
    }
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    // Implement dark mode logic
  };

  const handleAutoAcceptToggle = (value: boolean) => {
    setAutoAccept(value);
    if (value) {
      Alert.alert(
        'Auto Accept Enabled',
        'You will automatically accept ride requests when available.'
      );
    }
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
  };

  const handlePrivacyPolicy = () => {
    // Navigate to privacy policy
  };

  const handleTermsOfService = () => {
    // Navigate to terms of service
  };

  const handleContactSupport = () => {
    // Navigate to contact support
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Implement account deletion
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive ride updates and notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.lightGray, true: colors.primary }}
              thumbColor={notifications ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Location Tracking</Text>
              <Text style={styles.settingDescription}>
                Allow location tracking for better service
              </Text>
            </View>
            <Switch
              value={locationTracking}
              onValueChange={handleLocationToggle}
              trackColor={{ false: colors.lightGray, true: colors.primary }}
              thumbColor={locationTracking ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch to dark theme
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: colors.lightGray, true: colors.primary }}
              thumbColor={darkMode ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Accept Rides</Text>
              <Text style={styles.settingDescription}>
                Automatically accept ride requests
              </Text>
            </View>
            <Switch
              value={autoAccept}
              onValueChange={handleAutoAcceptToggle}
              trackColor={{ false: colors.lightGray, true: colors.primary }}
              thumbColor={autoAccept ? colors.white : colors.gray}
            />
          </View>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            variant="outline"
            style={styles.settingButton}
          />
          
          <Button
            title="Privacy Policy"
            onPress={handlePrivacyPolicy}
            variant="outline"
            style={styles.settingButton}
          />
          
          <Button
            title="Terms of Service"
            onPress={handleTermsOfService}
            variant="outline"
            style={styles.settingButton}
          />
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Button
            title="Contact Support"
            onPress={handleContactSupport}
            variant="outline"
            style={styles.settingButton}
          />
          
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            style={[styles.settingButton, styles.dangerButton]}
          />
        </Card>
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
    paddingTop: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    ...typography.body,
  },
  settingsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.lg,
    ...typography.heading2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.gray,
    ...typography.caption,
  },
  settingButton: {
    marginBottom: spacing.md,
  },
  dangerButton: {
    borderColor: colors.error,
  },
});

export default SettingsScreen;

