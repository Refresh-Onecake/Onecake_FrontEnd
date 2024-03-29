import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';

import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys, queryKeys} from '../enum';
import {useQuery, useQueryClient} from 'react-query';
import {getSellerChatAddress} from '../api';
import {useGetSellerChatUrlQuery} from '../hooks/useGetSellerChatUrlQuery';
import InfoModal from '../components/common/InfoModal';
import {Button} from '../components/common';

const Contact = () => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [roleTokenError, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });

  const {data, refetch} = useGetSellerChatUrlQuery(queryClient);
  const onClickOpenChat = useCallback(() => {
    refetch();
  }, [refetch]);

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
            <InfoModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              title={'카카오톡 채널'}
              subTitle={'카카오톡 채널을 등록해주세요!'}
            />
          </SafeAreaView>
        </>
      ) : (
        <>
          <SafeAreaView style={styles.flex}>
            <View>
              <Image
                style={{width: 318, height: 318}}
                source={require('../asset/menuListNone.png')}
              />
            </View>
            <Text style={styles.title}>원하는 가게 사장님과 상담해보세요!</Text>
          </SafeAreaView>
        </>
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
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
  btnWrap: {
    width: 270,
    height: 44,
    marginTop: 18,
  },
});
