import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../screens/navigator';
import {appKeys} from '../enum';
import {KeyValuePair} from '@react-native-async-storage/async-storage/lib/typescript/types';
import {assert} from '../utils';
import {Query, QueryKey} from 'react-query';

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

export type IRefreshToken = {
  refreshToken: IUserData['refreshToken'] | null;
  accessToken: IUserData['accessToken'] | null;
};

export type IRefreshTokenData = {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
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

export type ILoginResponse = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  role: string;
};

export const getUserData = async ({id, password}: ISignIn) => {
  const {data} = await apiClient.post<ILoginResponse>('/api/v1/auth/login', {
    user_id: id,
    password: password,
  });
  return data;
};

export const refetchToken = async (
  tokens: readonly KeyValuePair[] | undefined,
  query?: Query<unknown, unknown, unknown, QueryKey>,
) => {
  assert(
    tokens !== undefined,
    'token을 refresh 하기 위해서는 undefined가 아니어야 한다',
  );
  await fetch('http://15.165.27.120:8080/api/v1/auth/reissue', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: tokens[0][1],
      refreshToken: tokens[1][1],
    }),
  })
    .then(res => res.json())
    .then(async (data: IRefreshTokenData) => {
      await AsyncStorage.multiSet(
        [
          [appKeys.accessTokenKey, data.accessToken],
          [appKeys.refreshTokenKey, data.refreshToken],
        ],
        () => {
          console.log('기존 토큰 리프레쉬');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          query && console.log(`호출 api ${query.queryHash}`);
        },
      );
    });
};

export const fetchLogout = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const res = await fetch(`http://15.165.27.120:8080/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
};

//
export const fetchResign = async () => {
  const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  if (token) {
    const res = await fetch(`http://15.165.27.120:8080/api/v1/seller/resign`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
};
