import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import RegisterScreenLayout from '../../components/Register/RegisterScreen';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
        <RegisterScreenLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterScreen;
