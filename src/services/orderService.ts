import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';

export type ISellerOrderList = {
  id: number;
  cakeImage: string;
  cakeTitle: string;
  cakeDescription: string;
  price: number;
  consumerName: string;
  consumerPhone: string;
  orderDate: string;
  pickupDate: string;
  bgColor: string;
  cakeTaste: string;
  letterColor: string;
  letter: string;
  refImg: string;
  status: string;
};

export const getSellerOrderList = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch('http://localhost:3000/orderList', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
