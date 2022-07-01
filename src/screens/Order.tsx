import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {SellerOrder} from './sellerOrder/SellerOrder';

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
        <></>
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});
