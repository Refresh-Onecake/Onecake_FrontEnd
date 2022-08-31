import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getMultipleData} from '../../App';
import {appKeys} from '../enum';
import {assert} from '../utils';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export const customAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: 'https://want-onecake.com',
  });

  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
      if (config.headers) {
        assert(token, 'token은 undefined가 되어선 아니된다.');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      //Do something width request error
      //요청 시 에러 처리
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: {status},
      } = error;
      if (status === 401) {
        const tokens = await getMultipleData();
        assert(tokens, 'token은 undefined가 되어선 아니된다.');
        const originalRequest = config as AxiosRequestConfig;
        //token refresh 요청
        try {
          const {data} = await axios.post<RefreshTokenResponse>(
            'https://want-onecake.com/api/v1/auth/reissue',
            JSON.stringify({
              accessToken: tokens[0][1],
              refreshToken: tokens[1][1],
            }),
          );
          console.log('토근이 만료 되어 토근 갱신한 데이터:', data);
          await AsyncStorage.multiSet([
            [appKeys.accessTokenKey, data.accessToken],
            [appKeys.refreshTokenKey, data.refreshToken],
          ]);
          axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
          if (originalRequest.headers)
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch {
          console.log('err');
          return Promise.reject(error);
        }
      }
    },
  );
  return axiosInstance;
};
