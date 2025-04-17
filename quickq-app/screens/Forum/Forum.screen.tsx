import React from 'react';
import { View, StyleSheet, } from 'react-native';
import ForumScreenLayout from '../../components/Forum/Forum';

const ForumScreen = () => {
  return (
    <View style={styles.container}>
      <ForumScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForumScreen;
