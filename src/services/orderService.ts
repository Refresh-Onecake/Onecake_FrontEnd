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

export type IOrderSheet = {
  menuName: string;
  price: number;
  state: string;
  form: string[];
  memo: string;
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

//특정 주문서 가져오기
export const getSellerOrderSheet = async (orderId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `http://15.165.27.120:8080/api/v1/seller/store/order/form/${orderId}`,
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

//특정 주문서에 메모 저장하기
export const setOrderSheetMemo = async (orderId: number, memo: string) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `http://15.165.27.120:8080/api/v1/seller/store/order/form/${orderId}/memo`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({memo}),
      },
    );
    return response;
  }
};

//주문 상태 다음 단계로 변경
export const orderSheetChangeState = async (orderId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `http://15.165.27.120:8080/api/v1/seller/store/order/form/${orderId}/state`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }
};
