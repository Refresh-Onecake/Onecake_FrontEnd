import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuList} from '../components/seller/MenuList';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const role = 'SELLER';
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
            onPress={() => navigation.navigate('StoreDetail')}>
            <Icon
              size={18}
              style={{position: 'absolute', right: 0}}
              name="heart-outline"
            />
            <Image
              style={styles.image}
              source={require('../asset/customer.png')}></Image>
            <Text>[강남구] 링링케이크</Text>
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
});
