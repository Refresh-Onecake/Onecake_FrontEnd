/* eslint-disable @typescript-eslint/no-unsafe-call */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {appKeys} from '../enum';
import {IAddress, IEnterStoreInputForm, IStoreImg} from '../screens/enterStore';
import {ISignUpRsp} from './authService';

export interface IApplyStore extends IEnterStoreInputForm {
  address: IAddress;
  open_time: string;
  close_time: string;
  store_image: string;
}

export const fetchEnterStoreJson = async ({
  store_name,
  business_registration_number,
  store_phone_number,
  store_discription,
  kakao_channel_url,
  address,
  store_image,
  open_time,
  close_time,
}: IApplyStore) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const tmpApplyObj = {
      store_name,
      business_registration_number,
      store_phone_number,
      store_discription,
      kakao_channel_url,
      address,
      store_image,
      open_time,
      close_time,
    };

    const data = await fetch('https://want-onecake.com/api/v1/seller/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tmpApplyObj),
    });

    return data;
  }
};

export const fetchEnterPicture = async (storeImg: IStoreImg | string) => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const fd = new FormData();
    fd.append('image', storeImg);

    const data = await fetch('https://want-onecake.com/api/v1/member/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });
    return data;
  }
};
