import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../screens/navigator';

export type ISignUp = {
  user_id: string;
  name: string;
  password: string;
  phone_number: string;
  member_type: string;
};

export type ISignUpRsp = {
  success: string;
  message: string;
};

export type IUserData = {
  id: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  TokenExpires: number;
};

export const apiClient = axios.create({
  baseURL: 'http://15.165.27.120:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSignUp = async ({
  user_id,
  name,
  password,
  phone_number,
  member_type,
}: ISignUp) => {
  const {data} = await apiClient.post<ISignUpRsp>('/api/v1/auth/signup', {
    user_id,
    name,
    password,
    phone_number,
    member_type,
  });

  return data;
};

export type ISignIn = {
  id: IUserData['id'];
  password: IUserData['password'];
};

//TODO: 토큰 저장 로직의 위치가 어디가 좋을까, 헤더에 담는 것도 해야 함
export const getUserData = async ({id, password}: ISignIn) => {
  const {data} = await apiClient.post<IUserData>('/api/v1/auth/login', {
    user_id: id,
    password: password,
  });
  return data;
};
