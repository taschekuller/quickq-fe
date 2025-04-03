import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, Bell, Cat } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';



export default function Header() {
  const navigation = useNavigation();
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
            onPress={openDrawer}
            style={{ marginBottom: 10 }}
          >
          </Button>
        </View>
        <View>
          <Text style={styles.title}>
            QuickQ
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 0, padding: 0 }}>
          <Button
            circular
            scaleIcon={1.5}
            icon={Bell}
            style={{ marginBottom: 10 }}
          />
          <Button
            circular
            scaleIcon={1.5}
            icon={Cat}
            style={{ marginBottom: 10 }}
          />
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
  },
});