import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MessagesScreenLayout from '../../components/Messages/Messages';

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <MessagesScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagesScreen;
