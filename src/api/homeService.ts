import {appKeys} from '../enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://want-onecake.com/api/v1/consumer/home/';

export type IHotCakeList = {
  image: string;
  storeId: number;
  menuId: number;
  imageId: number;
};

export type ICityCakeList = {
  storeImage: string;
  id: number;
};

export type IKeywordCakeList = {
  image: string;
  storeId: number;
  menuId: number;
  imageId: number;
  keyword: string;
};

export const getHotCakeList = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);

  if (token) {
    const response = await fetch(`${baseURL}hot`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getCityCakeList = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);

  if (token) {
    const response = await fetch(`${baseURL}neighborhood`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getKeyWordCakeList = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);

  if (token) {
    const response = await fetch(`${baseURL}keyword`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};
