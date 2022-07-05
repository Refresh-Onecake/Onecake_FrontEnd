import axios from 'axios';
import {appKeys} from '../enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://15.165.27.120:8080';

export type IstoreTitleInfo = {
  likedNum: number;
  reviewNum: number;
  storeDescription: string;
  storeImage: string;
  storeName: string;
};

export const getStoreTitleInfo = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `${baseURL}/api/v1/consumer/stores/${storeId}/mainInfo`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }
};

export const getCakeSize = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `${baseURL}/api/v1/consumer/stores/${storeId}/order/cakesize`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }
};
