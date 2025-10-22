import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useNotifications } from '../../hooks/useNotifications';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const NotificationsScreen: React.FC = () => {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead, isLoading } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const handleNotificationPress = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    // Handle notification action
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const renderNotification = ({ item }: { item: any }) => (
    <Card 
      style={[
        styles.notificationCard,
        !item.read && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Badge
            text={item.type}
            color={getNotificationColor(item.type)}
            style={styles.typeBadge}
          />
        </View>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>

      <Text style={styles.notificationMessage}>{item.message}</Text>

      {item.rideId && (
        <View style={styles.rideInfo}>
          <Text style={styles.rideLabel}>Ride ID:</Text>
          <Text style={styles.rideValue}>#{item.rideId.slice(-6)}</Text>
        </View>
      )}
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptyMessage}>
        You don't have any notifications yet.
      </Text>
    </View>
  );

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'ride':
        return colors.primary;
      case 'payment':
        return colors.success;
      case 'promotion':
        return colors.warning;
      case 'system':
        return colors.info;
      default:
        return colors.gray;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  if (isLoading && notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Notifications</Text>
          {getUnreadCount() > 0 && (
            <Badge
              text={getUnreadCount().toString()}
              color={colors.primary}
              style={styles.unreadBadge}
            />
          )}
        </View>
        {getUnreadCount() > 0 && (
          <Button
            title="Mark All Read"
            onPress={handleMarkAllAsRead}
            variant="outline"
            style={styles.markAllButton}
          />
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.heading1,
  },
  unreadBadge: {
    // Additional styles if needed
  },
  markAllButton: {
    minWidth: 120,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  notificationCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationTitle: {
    color: colors.darkColor,
    marginRight: spacing.sm,
    ...typography.body,
  },
  typeBadge: {
    // Additional styles if needed
  },
  notificationTime: {
    color: colors.gray,
    ...typography.caption,
  },
  notificationMessage: {
    color: colors.gray,
    marginBottom: spacing.sm,
    ...typography.caption,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideLabel: {
    color: colors.gray,
    marginRight: spacing.sm,
    ...typography.caption,
  },
  rideValue: {
    color: colors.primary,
    ...typography.caption,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    color: colors.darkColor,
    marginBottom: spacing.md,
    ...typography.heading1,
  },
  emptyMessage: {
    color: colors.gray,
    textAlign: 'center',
    ...typography.body,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.gray,
    ...typography.body,
  },
});

export default NotificationsScreen;

