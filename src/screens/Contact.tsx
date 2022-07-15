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
import {useGetSellerChatUrlQuery} from '../hooks/useGetSellerChatUrlQuery';
import InfoModal from '../components/common/InfoModal';

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
    console.log(data);
    data === undefined ? setModalVisible(true) : Linking.openURL(data);
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
            <InfoModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              title={'카카오톡 채널'}
              subTitle={'카카오톡 채널을 등록해주세요!'}
            />
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
