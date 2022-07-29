import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../../enum';

export type IConsumerOrderHistoryType = {
  orderHistoryId: number;
  storeName: string;
  orderState: string;
  menuName: string;
  menuPrice: number;
  menuImage: string;
  hasReview: boolean;
};

export const getConsumerOrderHistory = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `https://want-onecake.com/api/v1/consumer/orderHistory`,
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
