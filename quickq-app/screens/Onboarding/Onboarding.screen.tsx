import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
        <OnboardingLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;
