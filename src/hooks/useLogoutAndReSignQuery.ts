import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMutation} from 'react-query';
import {getMultipleData} from '../../App';
import {RootStackParamList} from '../screens/navigator';
import {fetchLogout, refetchToken} from '../services';

export const useLogoutAndReSignQuery = (
  fetch: () => Promise<Response | undefined>,
  navigation: StackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >,
) => {
  return useMutation(
    async () => {
      await fetch().then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const token = await getMultipleData();
            refetchToken(token);
          }
          throw new Error(res?.status.toString());
        }
        if (res) return res.json();
      });
    },
    {
      retry: 3,
      onSuccess: data => {
        console.log('로그아웃에 필요한 리프레시 토큰 삭제 성공!');
        AsyncStorage.clear();
        navigation.reset({
          routes: [{name: 'StackNavigator', params: {screen: 'SignIn'}}],
        });
      },
      onError: err => {
        console.log(err);
      },
    },
  );
};
