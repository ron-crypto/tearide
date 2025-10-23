import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const ProfileScreen: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleChangeText = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        alwaysBounceVertical={false}
        overScrollMode="auto"
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account information</Text>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
              </Text>
            </View>
            <Text style={styles.userName}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={styles.userRole}>
              {user?.role === 'driver' ? 'Driver' : 'Passenger'}
            </Text>
          </View>

          <View style={styles.profileForm}>
            <View style={styles.nameRow}>
              <Input
                label="First Name"
                value={formData.firstName}
                onChangeText={(value) => handleChangeText('firstName', value)}
                editable={isEditing}
                style={styles.halfInput}
                wrapperStyle={styles.halfInputWrapper}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChangeText={(value) => handleChangeText('lastName', value)}
                editable={isEditing}
                style={styles.halfInput}
                wrapperStyle={styles.halfInputWrapper}
              />
            </View>

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleChangeText('email', value)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Phone"
              value={formData.phone}
              onChangeText={(value) => handleChangeText('phone', value)}
              editable={isEditing}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.actionButtons}>
            {isEditing ? (
              <View style={styles.editButtons}>
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  variant="outline"
                  style={styles.cancelButton}
                />
                <Button
                  title="Save"
                  onPress={handleSave}
                  style={styles.saveButton}
                />
              </View>
            ) : (
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              />
            )}
          </View>
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Account Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🚗</Text>
              </View>
              <Text style={styles.statValue}>
                {user?.role === 'driver' ? '0' : '0'}
              </Text>
              <Text style={styles.statLabel}>
                {user?.role === 'driver' ? 'Rides Given' : 'Rides Taken'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>⭐</Text>
              </View>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>💰</Text>
              </View>
              <Text style={styles.statValue}>
                {user?.role === 'driver' ? 'KSh 0' : 'KSh 0'}
              </Text>
              <Text style={styles.statLabel}>
                {user?.role === 'driver' ? 'Earnings' : 'Spent'}
              </Text>
            </View>
          </View>
          
          {/* Additional Stats Row
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📅</Text>
              </View>
              <Text style={styles.statValue}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
              </Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>✅</Text>
              </View>
              <Text style={styles.statValue}>
                {user?.is_verified ? 'Verified' : 'Pending'}
              </Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🎯</Text>
              </View>
              <Text style={styles.statValue}>
                {user?.total_rides || '0'}
              </Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
          </View> */}
        </Card>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl * 2, // Extra bottom padding to prevent cutoff
    minHeight: '100%',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  subtitle: {
    color: colors.gray,
    ...typography.body,
  },
  profileCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    color: colors.white,
    ...typography.heading1,
  },
  userName: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading2,
  },
  userRole: {
    color: colors.gray,
    ...typography.caption,
  },
  profileForm: {
    marginBottom: spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md, // Add margin to match other inputs
  },
  halfInput: {
    flex: 1,
  },
  halfInputWrapper: {
    flex: 1,
    marginBottom: 0, // Override default margin from Input component
  },
  actionButtons: {
    // Additional styles if needed
  },
  editButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  editButton: {
    // Additional styles if needed
  },
  statsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    color: colors.darkColor,
    marginBottom: spacing.lg,
    textAlign: 'center',
    ...typography.heading2,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    color: colors.primary,
    marginBottom: spacing.xs,
    ...typography.heading3,
    fontWeight: '700',
    textAlign: 'center',
  },
  statLabel: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.caption,
    fontSize: 12,
    fontWeight: '500',
  },
  logoutButton: {
    marginBottom: spacing.xl,
  },
});

export default ProfileScreen;

