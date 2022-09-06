import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';
import {IFetchMenu} from '../screens/enterMenu';

export type IMenuList = {
  image: string;
  menuName: string;
  menuDescription: string;
  price: number;
  id: number;
};

export type IMenuListItemDetails = {
  storeName: string;
  menuTaste: string;
  images: {
    id: number;
    image: string;
  }[];
};

export const getMenuList = async (menuId?: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      menuId
        ? `https://want-onecake.com/api/v1/seller/store/menu/${menuId}`
        : `https://want-onecake.com/api/v1/seller/store/menu`,
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

export const fetchStoreEnterMenu = async (data: IFetchMenu, menuId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    console.log(menuId);
    const response = await fetch(
      menuId !== -1
        ? `https://want-onecake.com/api/v1/seller/store/menu/${menuId}`
        : `https://want-onecake.com/api/v1/seller/store/menu`,
      {
        method: menuId !== -1 ? `PUT` : `POST`,
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

export const deleteMenu = async (menuId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `https://want-onecake.com/api/v1/seller/store/menu/${menuId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } else {
    throw new Error('401');
  }
};
//특정 메뉴의 이미지들 불러오기
export const getSellerMenuListItemDetails = async (menuId: number) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `https://want-onecake.com/api/v1/seller/store/menu/${menuId}/image`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } else {
    throw new Error('401');
  }
};

//기념일 이미지 업로드하기
export const setMenuDetailImageKeyword = async (
  menuId: number,
  imageUri: string | undefined,
  anniversary: string,
) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const anniv_key = {
      ['생일'.toString()]: 'BIRTHDAY',
      ['월별행사'.toString()]: 'MONTHLY_EVENT',
      ['기념일'.toString()]: 'ANNIVERSARY',
      ['취업'.toString()]: 'EMPLOYMENT',
      ['결혼'.toString()]: 'MARRIAGE',
      ['전역'.toString()]: 'DISCHARGE',
      ['기타'.toString()]: 'ETC',
    };
    const response = await fetch(
      `https://want-onecake.com/api/v1/seller/store/menu/${menuId}/image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: imageUri,
          keyword: anniv_key[anniversary],
        }),
      },
    );
    return response;
  }
};

//특정 이미지의 관련 정보 가져오기
export const getMenuImageDetail = async (
  menuId: number,
  imageId: number,
  method = 'GET',
) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const response = await fetch(
      `https://want-onecake.com/api/v1/seller/store/menu/${menuId}/image/${imageId}`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } else {
    throw new Error('401');
  }
};
