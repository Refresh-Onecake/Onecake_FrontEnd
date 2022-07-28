import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {SellerOrder} from './sellerOrder/SellerOrder';
import InfoModal from '../components/common/InfoModal';

const Order = () => {
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

  return (
    <SafeAreaView style={styles.view}>
      {role === appKeys.seller ? (
        <>
          <SellerOrder />
        </>
      ) : (
        <View style={styles.flex}>
          <View>
            <Image
              style={{
                marginTop: 56,
                width: 300,
                height: 300,
              }}
              source={require('../asset/cake.png')}
            />
          </View>
          <Text style={styles.title}>
            런칭 준비중입니다. 조금만 기다려 주세요.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Order;

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
    fontSize: AppStyles.font.large,
  },
});
