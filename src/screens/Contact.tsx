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
import {appKeys, queryKeys} from '../enum';
import {useQuery, useQueryClient} from 'react-query';
import {getSellerChatAddress} from '../services';

const Contact = () => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<string>();
  const [roleTokenError, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });

  const {data, refetch} = useQuery(
    queryKeys.sellerChatAddress,
    async () =>
      await getSellerChatAddress().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.text();
        }
      }),
    {
      onSuccess: data => {
        console.log('이거 맞냐?');
        console.log(data);
      },
      onError: err => {
        console.log('셀러 URL 가져오기 오류');
        const response = err as Error;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.sellerChatAddress);
          console.log(`${queryKeys.sellerChatAddress.toString()} 쿼리 성공`);
        }
      },
    },
  );

  const onClickOpenChat = useCallback(() => {
    // Linking.openURL('http://pf.kakao.com/_pRxlZxb');
    refetch();
    console.log(data);
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
              주문 상담은 카카오톡 채널로 진행합니다.
            </Text>
            <View style={styles.btnWrap}>
              <Button text="카카오톡 채널로 이동" onPress={onClickOpenChat} />
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
