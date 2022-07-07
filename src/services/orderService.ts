import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from 'react';
import {appKeys, orderStatusKeys, OrderStatusUnion} from '../enum';

export type ISellerOrderList = {
  readonly [k in OrderStatusUnion]: ISellerOrder[];
};

export type ISellerOrder = {
  id: number;
  storeMenuListDto: IStoreMenuListDto;
};

export type IStoreMenuListDto = {
  image: string;
  menuName: string;
  menuDescription: string;
  price: number;
};

// 특정 날짜의 주문들 가져오기
export const getSellerOrderList = async (date: string) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `http://15.165.27.120:8080/api/v1/seller/store/order/${date}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }
};

export const getSellerOrderSheet = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch('http://localhost:3000/orderSheet', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};
