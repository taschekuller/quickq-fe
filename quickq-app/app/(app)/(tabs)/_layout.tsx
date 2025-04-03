import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
// Removed Button import as we won't use it here
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Home } from '@tamagui/lucide-icons'; // Import the icon component

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: 'transparent',
            position: 'absolute',
          },
          default: {},
        }),
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      })}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => (
            <Home
              color={"#87888A"}
              size={size * 1.2}
            />
          ),
        }}
      />
    </Tabs>
  );
}