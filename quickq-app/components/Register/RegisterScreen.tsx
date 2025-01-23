import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { LogIn } from '@tamagui/lucide-icons'


WebBrowser.maybeCompleteAuthSession();

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    clientId: 'YOUR_EXPO_CLIENT_ID'
  });

  const handleRegister = () => {
    // TODO: Implement registration logic
    console.log('Register attempted with:', email, password, name);
    router.push('/(routes)/Onboarding');
  };

  const handleGoogleAuth = async () => {
    const result = await promptAsync();
    if (result?.type === 'success') {
      // Handle successful Google authentication
      console.log('Google auth successful:', result);
      router.push('/(routes)/Onboarding');
    }
  };

  const handleAppleAuth = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Handle successful Apple authentication
      console.log('Apple auth successful:', credential);
      router.push('/(routes)/Onboarding');
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        // Handle user cancellation
      } else {
        // Handle other errors
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create Account</Text>
        <Text style={styles.subHeaderText}>Sign up to get started</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        
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
          onPress={handleRegister}
          style={styles.registerButton}
          theme="active"
        >
          Register
        </Button>

        <Text style={styles.orText}>or continue with</Text>

        <View style={styles.socialButtonsContainer}>
          <Button
            onPress={handleGoogleAuth}
            style={styles.socialButton}
            icon={LogIn}
          >
            Google
          </Button>

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.appleButton}
            onPress={handleAppleAuth}
          />
        </View>
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
  registerButton: {
    height: 50,
    marginTop: 16,
    marginBottom: 24,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginVertical: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  socialButton: {
    flex: 1,
    marginRight: 8,
    height: 50,
  },
  appleButton: {
    flex: 1,
    marginLeft: 8,
    height: 50,
  },
});

export default RegisterScreen;
