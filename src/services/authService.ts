import {StackScreenProps} from '@react-navigation/stack';
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
    'Content-type': 'application/json',
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

export const getUserData = async (
  {id, password}: ISignIn,
  {navigation}: StackScreenProps<RootStackParamList>,
) => {
  try {
    const {data} = await apiClient.post<IUserData>('/api/v1/auth/login', {
      user_id: id,
      password: password,
    });
    // await AsyncStorage.multiSet([
    //   ['AccessToken', data.accessToken],
    //   ['RefreshToken', data.refreshToken],
    // ]);
    console.log(data);
    navigation.navigate('MainNavigation');
  } catch (e) {
    console.log('로그인 오류');
  }
};
