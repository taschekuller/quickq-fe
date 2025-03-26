import React from 'react';
import { View, StyleSheet, } from 'react-native';
import HomeScreenLayout from '../../components/Home/HomeScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
