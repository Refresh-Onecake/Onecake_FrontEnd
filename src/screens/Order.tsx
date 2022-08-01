import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {SellerOrder} from './sellerOrder/SellerOrder';
import InfoModal from '../components/common/InfoModal';
import {ConsumerOrderList} from '../components/consumer/Order';

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
        <>
          <ConsumerOrderList />
        </>
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});
