import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {appKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';

export const SelectUserType = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  // checkIcon 하기 위한 것
  const [selectedUserIcon, setSelectedUserIcon] = useState<string>(
    appKeys.consumer,
  );
  const userTypeList = [appKeys.consumer, appKeys.seller];

  const goToSignUp = (userType: string) => {
    console.log(userType);
    setSelectedUserIcon(userType);
    userType === appKeys.consumer
      ? navigation.navigate('SignUp', {
          userType: appKeys.consumer,
        })
      : navigation.navigate('SignUp', {
          userType: appKeys.seller,
        });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 48}}>
        사용자 유형을 선택해주세요.
      </Text>

      {userTypeList.map((val, idx) => (
        <Pressable
          key={idx}
          onPress={() => goToSignUp(val)}
          style={[
            val === selectedUserIcon
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
          <Text>{val === appKeys.consumer ? '소비자' : '판매자'}</Text>
          {val === selectedUserIcon && (
            <Image
              style={styles.checkIcon}
              source={require('../../asset/checkIcon.png')}></Image>
          )}
        </Pressable>
      ))}
    </SafeAreaView>
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
    left: 1,
    top: 1,
  },
});
