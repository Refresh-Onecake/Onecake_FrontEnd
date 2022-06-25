/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import {IAddress, IEnterStoreInputForm, IStoreImg} from '../screens/enterStore';
import {ISignUpRsp} from './authService';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1NjEzOTAyMX0.9r6pQGuWXcwcWXygJ2xx4qRsr2E9YEaoF6UgYo0jnS85txWwePJE479mKM-l36X3pZqM5ZuVQCrDUpyS0pdpCw';

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
  open_time,
  close_time,
}: IApplyStore) => {
  try {
    const tmpApplyObj = {
      store_name,
      business_registration_number,
      store_phone_number,
      store_discription,
      kakao_channel_url,
      address,
      open_time,
      close_time,
    };

    const data = await fetch('http://15.165.27.120:8080/api/v1/seller/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tmpApplyObj),
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchEnterPicture = async (storeImg: IStoreImg | string) => {
  try {
    const fd = new FormData();
    fd.append('image', storeImg);

    const data = await fetch('http://15.165.27.120:8080/api/v1/member/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });
    return data.text();
  } catch (e) {
    console.log(e);
  }
};
