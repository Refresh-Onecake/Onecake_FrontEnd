import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {Button} from '../components';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';

const Contact = () => {
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });

  const onClickOpenChat = useCallback(() => {
    Linking.openURL('http://pf.kakao.com/_pRxlZxb');
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      {role === appKeys.seller ? (
        <>
          <SafeAreaView style={styles.flex}>
            <View>
              <Image
                style={{width: 318, height: 318}}
                source={require('../asset/menuListNone.png')}
              />
            </View>
            <Text style={styles.title}>
              주문 상담은 카카오톡 체널로 진행합니다.
            </Text>
            <View style={styles.btnWrap}>
              <Button text="카카오톡 체널로 이동" onPress={onClickOpenChat} />
            </View>
          </SafeAreaView>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
  flex: {
    marginTop: 50,
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
