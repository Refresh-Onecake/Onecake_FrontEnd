import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStringValueFromAsyncStorage = async (key: string) => {
  try {
    const role = await AsyncStorage.getItem(key);
    return role;
  } catch {
    console.log('토큰 불러오기 실패');
  }
};
