import axios from 'axios';
import {IAddress, IEnterStoreInputForm, IStoreImg} from '../screens/enterStore';
import {ISignUpRsp} from './authService';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NTU4MjM0OTl9.v3mCe7TdCBInB78JHB8-qgK30wfgs9QSdpmsTMPcKJZw4kiKmW9lImmtFIykjT50hL0h2pd9Yv5BoJXR7U04xA';

export const enterFormClient = axios.create({
  baseURL: 'http://15.165.27.120:8080',
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

  const formData = new FormData();
  // TODO: 사진
  formData.append('image', storeImg);
  // TODO: JSON
  formData.append(
    'applyStoreRequestDto',
    new Blob([JSON.stringify(tmpApplyObj)], {
      type: 'application/json',
    }),
  );

  const {data} = await axios.post<ISignUpRsp>('/api/v1/seller/store', formData);
  console.log(data);
  return data;
};
