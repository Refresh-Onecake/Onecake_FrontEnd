import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';
import {IFetchMenu} from '../screens/enterMenu';

export type IMenuList = {
  image: string;
  menuName: string;
  menuDescription: string;
  price: number;
};

export const getMenuList = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      'http://15.165.27.120:8080/api/v1/seller/store/menu',
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

export const fetchStoreEnterMenu = async (data: IFetchMenu) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      'http://15.165.27.120:8080/api/v1/seller/store/menu',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    return response;
  }
};
