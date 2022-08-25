import {appKeys} from '../enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://want-onecake.com/api/v1/consumer/stores/';

export type IStoreTitleInfo = {
  storeImage: string;
  storeName: string;
  storeDescription: string;
  isLiked: boolean;
  likeNum: number;
};

export type ICakeList = {
  image: string;
  menuName: string;
  menuDescription: string;
  price: string;
};

export type IStoreInfo = {
  operatingTime: string;
  dayOff: string;
  address: string;
  storeDescription: string;
};

export type IReviews = {
  userName: string;
  reviewNum: number;
  reviews: [
    {
      profileImg: string;
      userName: string;
      timeHistory: string;
      content: string;
    },
  ];
};

export const getStoreTitleInfo = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(`${baseURL}${storeId}/mainInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getCakeList = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(`${baseURL}${storeId}/menuList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getStoreInfo = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(`${baseURL}${storeId}/storeInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getReviews = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(`${baseURL}review/${storeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const getCakeSize = async (storeId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(`${baseURL}${storeId}/order/cakesize`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};
