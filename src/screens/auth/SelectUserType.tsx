import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useState, useRef, Fragment} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {appKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';

export const SelectUserType = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  // checkIcon 하기 위한 것
  const [selectedUser, setSelectedUser] = useState<string>(appKeys.consumer);

  const userTypeList = [appKeys.consumer, appKeys.seller];

  const goToSignUp = (userType: string) => {
    console.log(userType);
    userType === appKeys.consumer
      ? navigation.navigate('SignUp', {
          userType: appKeys.consumer,
        })
      : navigation.navigate('SignUp', {
          userType: appKeys.seller,
        });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.wrapper}>
        <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 48}}>
          사용자 유형을 선택해주세요.
        </Text>
        <View>
          {userTypeList.map((val, idx) => (
            <Pressable
              key={idx}
              onPress={() => setSelectedUser(val)}
              style={[
                val === selectedUser
                  ? styles.checkedIcon
                  : styles.unCheckedIcon,
                styles.typeBtn,
              ]}>
              <Image
                resizeMode={val == appKeys.seller ? 'contain' : 'cover'}
                style={styles.imgShape}
                source={
                  val == appKeys.consumer
                    ? require('../../asset/customer.png')
                    : require('../../asset/seller.png')
                }
              />
              <Text style={styles.btnText}>
                {val === appKeys.consumer ? '소비자' : '판매자'}
              </Text>
              {val === selectedUser && (
                <Image
                  style={styles.checkIcon}
                  source={require('../../asset/checkIcon.png')}></Image>
              )}
            </Pressable>
          ))}
        </View>
        <Pressable
          style={styles.selectBtn}
          onPress={() => goToSignUp(selectedUser)}>
          <Text
            style={{
              color: AppStyles.color.white,
              fontSize: 17,
              fontWeight: '600',
            }}>
            선택하기
          </Text>
        </Pressable>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: AppStyles.color.hotPink}} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
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
  },
  checkedIcon: {
    borderWidth: 3,
    borderColor: AppStyles.color.hotPink,
  },
  unCheckedIcon: {
    borderWidth: 0,
  },
  checkIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    left: Platform.OS === 'android' ? 1 : -8,
    top: Platform.OS === 'android' ? 1 : -8,
  },
  btnText: {
    paddingTop: 9,
    paddingBottom: 11,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
  },
  selectBtn: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    height: 40,
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: AppStyles.color.hotPink,
  },
});
