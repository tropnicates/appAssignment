import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (validateForm()) {
      setIsSignedIn(true);
      Alert.alert("Login Successful", `Welcome, ${email.split('@')[0]}!`);
      clearForm();
    }
  };

  const handleSignUp = () => {
    if (validateSignUpForm()) {
      Alert.alert("Sign Up Successful", `Account created for ${email.split('@')[0]}.`);
      setIsSignUp(false);
      clearForm();
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Both email and password are required.');
      return false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const validateSignUpForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required for sign up.');
      return false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    Alert.alert("Logged Out", "You have been signed out.");
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {email.split('@')[0]}!</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={isSignUp ? handleSignUp : handleLogin}>
            <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleText}>
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8f8f8' },
  formContainer: { width: '100%', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    width: '90%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007ACC',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  toggleText: { color: '#007ACC', marginTop: 20, fontSize: 16 },
  welcomeContainer: { alignItems: 'center' },
  welcomeText: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 20 },
  signOutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
  signOutText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
});

export default ProfileScreen;
