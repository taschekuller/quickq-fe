import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempted with:', email, password);
    router.push('/(routes)/Onboarding'); //TODO Route to home
  };

  const handleSignUp = () => {
    router.push('/(routes)/Onboarding');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.subHeaderText}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button 
          onPress={handleLogin}
          style={styles.loginButton}
          theme="active"
        >
            
          Login
        </Button>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    marginTop: 16,
    marginBottom: 24,
  },
  signUpText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
