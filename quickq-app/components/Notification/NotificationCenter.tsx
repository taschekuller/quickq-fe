import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Bell } from '@tamagui/lucide-icons';
import { Avatar, Button, useTheme, XStack, YStack } from 'tamagui';
import { format } from 'date-fns';
import { CircleX } from '@tamagui/lucide-icons';

// Define notification type
interface Notification {
  id: string;
  name: string;
  comment: string;
  time: Date;
  avatar: string;
  read: boolean;
}

// Dummy data for notifications
const initialNotifications = [
  {
    id: '1',
    name: 'John Doe',
    comment: 'Mentioned you in a comment',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    avatar: 'https://avatar.iran.liara.run/public/1',
    read: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    comment: 'Send you a superlike',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    avatar: 'https://avatar.iran.liara.run/public/2',
    read: true,
  },
  {
    id: '3',
    name: 'Alex Johnson',
    comment: 'Replied to your comment',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    avatar: 'https://avatar.iran.liara.run/public/3',
    read: false,
  },
  {
    id: '4',
    name: 'Sara Wilson',
    comment: 'Create a new question',
    time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    avatar: 'https://avatar.iran.liara.run/public/4',
    read: true,
  },
];

const NotificationCenter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const theme = useTheme();

  // Format time to display relative to current time
  const formatTime = (time: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return format(time, 'MMM d');
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark notification as unread
  const markAsUnread = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        style={[styles.swipeAction, { backgroundColor: '#4CAF50' }]}
        onPress={() => markAsRead(id)}
      >
        <Text style={styles.swipeActionText}>Read</Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (id: string) => {
    return (
      <TouchableOpacity
        style={[styles.swipeAction, { backgroundColor: '#2196F3' }]}
        onPress={() => markAsUnread(id)}
      >
        <Text style={styles.swipeActionText}>Unread</Text>
      </TouchableOpacity>
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id)}
        renderLeftActions={() => renderLeftActions(item.id)}
      >
        <SafeAreaView>
          <View style={[
            styles.notificationItem,
            { backgroundColor: item.read ? '#1e1e1e' : '#2e2e2e' }
          ]}>
            <Avatar size="$3" marginRight={10}>
              <Avatar.Image src={item.avatar} />
            </Avatar>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationName}>{item.name}</Text>
              <Text style={styles.notificationComment}>{item.comment}</Text>
              <Text style={styles.notificationTime}>{formatTime(item.time)}</Text>
            </View>
            {!item.read && <View style={styles.unreadIndicator} />}
          </View>
        </SafeAreaView>
      </Swipeable>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View>
      <Button
        circular
        scaleIcon={1.5}
        icon={Bell}
        color={"#e1e1e1"}
        style={{ backgroundColor: "none" }}
        onPress={() => setModalVisible(true)}
      >
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1e1e' }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <YStack space={10} width="100%">
                <XStack justifyContent="space-between" alignItems="center" width="100%">
                  <Text style={styles.modalTitle}>Notifications</Text>
                  <Button size="$2" onPress={() => setModalVisible(false)}>
                    <CircleX />
                  </Button>
                </XStack>

                {notifications.length > 0 ? (
                  <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={item => item.id}
                    style={styles.notificationList}
                  />
                ) : (
                  <View style={styles.emptyState}>
                    <Text>No notifications yet</Text>
                  </View>
                )}
              </YStack>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e1e1e1',
  },
  notificationList: {
    width: '100%',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    width: '100%',
  },
  notificationContent: {
    flex: 1,
  },
  notificationName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e1e1e1',
  },
  notificationComment: {
    fontSize: 14,
    color: '#6e6e6e',
    marginTop: 2,

  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  swipeActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default NotificationCenter;