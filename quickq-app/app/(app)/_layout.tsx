import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Home } from '@tamagui/lucide-icons'


interface DrawerIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
}

const DrawerIcon = ({ name, color, size }: DrawerIconProps) => (
  <Ionicons name={name ?? "search"} size={size ?? 24} color={color} />
);

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerPosition: 'left',
          drawerStyle: {
            width: "70%",
          },
          drawerActiveTintColor: 'tomato',
          drawerInactiveTintColor: 'gray',
        }
        }
      >
        <Drawer.Screen
          name="tabs"
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ size, color }) => <Home size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Mağaza',
            title: 'Mağaza',
            drawerIcon: ({ color, size }) => (
              <DrawerIcon name="home-outline" color={color} size={size} />
            ),
          }}
        />

      </Drawer>
    </GestureHandlerRootView >
  );
}