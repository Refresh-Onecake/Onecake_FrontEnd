import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';

export const getSellerChatAddress = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      'https://want-onecake.com/api/v1/seller/chat',
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
