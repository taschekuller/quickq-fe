import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import LoginScreenLayout from '../../components/Login/LoginScreen';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        <LoginScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
