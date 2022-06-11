import axios from 'axios';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';

const SignIn = () => {
  axios.post('http://???/api/v1/auth/login');

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaProvider>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
    </SafeAreaProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderBottomColor: 'black',
    height: 50,
    width: 268,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
