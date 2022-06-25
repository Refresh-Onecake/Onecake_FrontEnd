import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../screens/navigator';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('StoreDetail')}>
        <Icon
          style={{width: 18, height: 18, position: 'absolute', right: 0}}
          name="home-heart"
        />
        <Image
          style={styles.image}
          source={require('../asset/customer.png')}></Image>
        <Text>[강남구] 링링케이크</Text>
      </TouchableOpacity>
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
