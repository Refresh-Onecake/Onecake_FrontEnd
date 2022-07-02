import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuList} from '../components/seller/MenuList';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
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
      {role === 'COSTUMER' ? (
        // TODO: 사장님 페이지
        <>
          <MenuList />
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('StoreDetail', {storeId: 1})}>
            <Icon
              size={18}
              style={{position: 'absolute', right: 0}}
              name="heart-outline"
            />
            <Image
              style={styles.image}
              source={require('../asset/customer.png')}></Image>
            <Text>[강남구] 링링케이크</Text>
            <View style={styles.liked}>
              <Text style={{marginRight: 3}}>찜</Text>
              {/* TODO: 받아와야함*/}
              <Text>234</Text>
              <Text>개</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Stores;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
  card: {
    width: 166,
    height: 250,
    borderRadius: 8,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  image: {
    width: 166,
    height: 214,
  },
  liked: {
    marginTop: 5,
    flexDirection: 'row',
  },
});
