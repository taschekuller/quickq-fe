import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text, XStack, YStack } from 'tamagui';
import { Mail, Lock, LogIn } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Ionicons from '@expo/vector-icons/Ionicons';

WebBrowser.maybeCompleteAuthSession();
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Google authentication setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    clientId: 'YOUR_EXPO_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('Google auth success:', response);
      router.push('/onboarding');
    }
  }, [response]);

  const handleGoogleAuth = async () => {
    await promptAsync();
  };

  const handleAppleAuth = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Apple auth successful:', credential);
      router.push('/(app)/tabs/(home)');
    } catch (e: any) {
      console.log('Apple auth error:', e);
    }
  };

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);
    router.push('/(app)/tabs/(home)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hoşgeldiniz</Text>
        <Text style={styles.subHeaderText}>QuickQ</Text>
      </View>

      <View style={styles.formContainer}>
        <XStack alignItems="center" style={styles.inputContainer}>
          <Ionicons name="person-circle-outline" size={24} color="gray" />
          <Input
            flex={1}
            height={50}
            placeholder="İsim Soyisim"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            borderWidth={0}
            backgroundColor={'transparent'}
          />
        </XStack>
        <XStack alignItems="center" style={styles.inputContainer}>
          <Mail size={20} color="gray" />
          <Input
            flex={1}
            height={50}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            borderWidth={0}
            backgroundColor={'transparent'}
          />
        </XStack>

        <XStack alignItems="center" style={styles.inputContainer}>
          <Lock size={20} color="gray" />
          <Input
            flex={1}
            height={50}
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderWidth={0}
            backgroundColor={'transparent'}
          />
        </XStack>

        <XStack alignItems="center" style={styles.inputContainer}>
          <Lock size={20} color="gray" />
          <Input
            flex={1}
            height={50}
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderWidth={0}
            backgroundColor={'transparent'}
          />
        </XStack>

        <Button onPress={handleLogin} style={styles.loginButton} theme="active" borderRadius={36}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Hesap Oluştur</Text>
        </Button>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.signUpLink}>Hesabın var mı, Giriş Yap.</Text>
        </TouchableOpacity>

        <YStack style={{ bottom: 0, position: 'absolute', width: '100%', marginBottom: 20, alignItems: 'center' }}>
          <Text style={{ color: '#B1B8BE', fontSize: 14 }}>
            Devam ederek QuickQ'nun
          </Text>
          <TouchableOpacity>
            <Text style={{ color: '#CBD9E6', fontWeight: 'bold', fontSize: 14 }}>
              Gizlilik Politikası ve Hizmet Şartları'nı
            </Text>
          </TouchableOpacity>
          <Text style={{ color: '#B1B8BE', fontSize: 14 }}>
            kabul etmiş olursunuz.
          </Text>
        </YStack>


      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bcbcbc',
  },
  subHeaderText: {
    fontSize: 32,
    color: '#e1e1e1',
    fontWeight: 'bold',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 36,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  loginButton: {
    borderRadius: 36,
    height: 50,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#D9F87F',
  },
  signUpText: {
    textAlign: 'center',
    color: '#B1B8BE',
    fontSize: 14,
  },
  signUpLink: {
    color: '#CBD9E6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 0.5,
    flex: 1,
    backgroundColor: '#B1B8BE',
  },
  orText: {
    fontSize: 16,
    color: '#B1B8BE',
    marginHorizontal: 10,
  },
  authButtons: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 0.4,
    gap: 8,
  },
  socialButton: {
    flex: 1,
  },
});

export default RegisterScreen;
