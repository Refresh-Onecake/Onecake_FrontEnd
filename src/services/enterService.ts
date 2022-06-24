/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import {IAddress, IEnterStoreInputForm, IStoreImg} from '../screens/enterStore';
import {ISignUpRsp} from './authService';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NTU4ODMzMDh9.0zD21g7dTnaLPmjNmA-Er6eCTzmCcMxyfwj7iXNLVHtFl3nCGTZAFkwnTWcgbIwb5wcJsborumz8Waee9G_wIg';

export const enterFormClient = axios.create({
  baseURL: 'https://15.165.27.120:8080',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
});

export interface IApplyStore extends IEnterStoreInputForm {
  address: IAddress;
  open_time: string;
  close_time: string;
  storeImg: IStoreImg;
}

export const fetchEnterStore = async ({
  store_name,
  business_registration_number,
  store_phone_number,
  store_discription,
  kakao_channel_url,
  address,
  open_time,
  close_time,
  storeImg,
}: IApplyStore) => {
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
  console.log(storeImg);
  console.log(tmpApplyObj);

  const tmp = {
    store_name: '마라탕가게',
    business_registration_number: '142-32-144245',
    address: {
      jibun_address: '지번',
      road_full_addr: '도로명',
      si_nm: '시',
      sgg_nm: '시군구',
      emd_nm: '읍면동',
      lnbr_mnnm: '뭐지',
      address_detail: '디테일주소',
    },
    store_phone_number: '010-1123-2222',
    store_discription: '맛깔나는 마라탕',
    open_time: '09:00',
    close_time: '21:00',
    kakao_channel_url: 'kakaochannel.maratang.com',
  };

  const formData = new FormData();
  // TODO: 사진
  formData.append('image', storeImg);

  const {data} = await enterFormClient.post<ISignUpRsp>(
    '/api/v1/seller/store',
    formData,
  );
  return data;
};
