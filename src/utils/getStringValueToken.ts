import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param key - AsyncStorage로부터 fetch 하고 싶은 key 값을 입력합니다.
 * @returns String Value 값을 가진 정보를 가져옵니다.
 */
export const getStringValueToken = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('token 가져오기 실패');
    console.log(e);
  }
  console.log('디바이스로부터 토큰을 가져옴');
};
