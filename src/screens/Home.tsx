import {
  Image,
  SafeAreaView,
  StyleSheet,
  // TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import {StoreTitleInfo} from './store/StoreTitleInfo';
import {TabView} from './store/TabView';
import {useRecoilState} from 'recoil';
import {storeIdState} from '../recoil/atom';
import {useIsFocused} from '@react-navigation/native';
import {focusManager} from 'react-query';
import {Button} from '../components';

const Home = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const [role, setRole] = useState<string>();
  const [storeId, setStoreId] = useRecoilState(storeIdState);
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      console.log('role', fetchData);
      setRole(fetchData);
    }
  });

  const [error1, resetError1] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(appKeys.storeIdKey);
    if (fetchData) {
      setStoreId(Number(fetchData));
      console.log('id', fetchData);
      console.log(storeId);
    }
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    focusManager.setFocused(isFocused);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.view}>
      {role === 'SELLER' ? (
        storeId === 0 ? (
          <SafeAreaView style={styles.flex}>
            <View>
              <Image
                style={{width: 318, height: 318}}
                source={require('../asset/menuListNone.png')}
              />
            </View>
            <Text style={styles.title}>
              가게 정보가 없습니다. 입점 신청을 완료해 주세요.
            </Text>
            <View style={styles.btnWrap}>
              <Button
                text="입점 신청하러 가기"
                onPress={() => {
                  navigation.navigate('EnterStart');
                }}
              />
            </View>
          </SafeAreaView>
        ) : (
          <>
            <StoreTitleInfo></StoreTitleInfo>
            <TabView></TabView>
          </>
        )
      ) : (
        <>
          <Text>소비자홈</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
  flex: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: AppStyles.color.subTitle,
    fontSize: AppStyles.font.middle,
  },
  btnWrap: {
    width: 270,
    height: 44,
    marginTop: 20,
  },
});
