import React from 'react';
import { View, StyleSheet, } from 'react-native';
import ProfileScreenLayout from '../../components/Profile/Profile';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
