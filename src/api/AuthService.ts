import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const apiAuth = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    'Content-type': 'application/json',
    AccessToken: AsyncStorage.getItem('AccessToken'),
  },
});
