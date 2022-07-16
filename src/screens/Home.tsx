import {
  SafeAreaView,
  StyleSheet,
  // TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {StoreDetail} from './store';
import {StoreTitleInfo} from './store/StoreTitleInfo';
import {TabView} from './store/TabView';
import {useRecoilState} from 'recoil';
import {storeIdState} from '../recoil/atom';

const Home = () => {
  const [role, setRole] = useState<string>();
  const [storeId, setStoreId] = useRecoilState(storeIdState);
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
      {role === 'SELLER' ? (
        <>
          <StoreTitleInfo></StoreTitleInfo>
          <TabView></TabView>
        </>
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
});
