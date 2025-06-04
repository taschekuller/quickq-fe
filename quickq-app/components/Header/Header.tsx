import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, Cat } from '@tamagui/lucide-icons';
import { Avatar, Button, XStack } from 'tamagui';
import { NotificationCenter } from '../Notification';


export default function Header() {
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView>
      <View style={[styles.header]}>
        <View>
          <Button
            circular
            scaleIcon={2}
            icon={Menu}
            color={"#e1e1e1"}
            onPress={openDrawer}
            style={{ marginBottom: 10, backgroundColor: "none" }}
          >
          </Button>
        </View>
        <View>
          <Text style={styles.title}>
            QuickQ
          </Text>
        </View>
        <View>
          <XStack
            alignItems="center"
            justifyContent="center"
          >
            <NotificationCenter />
            <Button
              circular
              backgroundColor={"none"}
              onPress={() => router.push('/(app)/tabs/(profile)')}
            >
              <Avatar size="$2" alignSelf="center">
                <Avatar.Image src="https://avatar.iran.liara.run/public/1" />
              </Avatar>
            </Button>
          </XStack>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: "#e1e1e1"
  },
});