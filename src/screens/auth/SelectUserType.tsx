import {StyleSheet, Text, Image, Pressable, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {appKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';

const SelectUserType = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const [sellerCheckIcon, setSellerCheckIcon] = useState('none');
  const [customerCheckIcon, setCustomerCheckIcon] = useState('none');

  const letToggle = (type: string) => {
    type === 'customer'
      ? setCustomerCheckIcon('flex')
      : setSellerCheckIcon('flex');

    setTimeout(() => {
      goToSignUp(appKeys.consumer);
    }, 1);

    setTimeout(() => {
      setCustomerCheckIcon('none');
      setSellerCheckIcon('none');
    }, 1000);
  };

  const goToSignUp = (userType: string) => {
    console.log(userType);
    navigation.navigate('SignUp', {
      userType: userType,
    });
  };
  return (
    <SafeAreaProvider style={styles.wrapper}>
      <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 48}}>
        사용자 유형을 선택해주세요.
      </Text>

      <Pressable
        onPress={() => [letToggle('customer')]}
        style={({pressed}) => [
          {
            borderWidth: pressed ? 3 : 0,
            borderColor: pressed ? AppStyles.color.pink : AppStyles.color.white,
          },
          styles.typeBtn,
        ]}>
        <Image
          style={[styles.checkIcon, {display: customerCheckIcon}]}
          source={require('../../asset/checkIcon.png')}
        />
        <Image
          style={styles.imgShape}
          source={require('../../asset/customer.png')}
        />
        <Text>소비자</Text>
      </Pressable>
      <Pressable
        onPress={() => [goToSignUp(appKeys.seller), letToggle('seller')]}
        style={({pressed}) => [
          {
            borderWidth: pressed ? 3 : 0,
            borderColor: pressed ? AppStyles.color.pink : AppStyles.color.white,
          },
          styles.typeBtn,
        ]}>
        <Image
          style={[styles.checkIcon, {display: sellerCheckIcon}]}
          source={require('../../asset/checkIcon.png')}
        />
        <Image
          resizeMode={'contain'}
          style={styles.imgShape}
          source={require('../../asset/seller.png')}
        />
        <Text>판매자</Text>
      </Pressable>
    </SafeAreaProvider>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppStyles.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBtn: {
    paddingTop: 13,
    justifyContent: 'space-evenly',
    borderRadius: 16,
    backgroundColor: 'white',
    width: 178,
    height: 186,
    marginBottom: 21,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  imgShape: {
    width: 132,
    height: 132,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
  },
  checkIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    left: 1,
    top: 1,
  },
});
