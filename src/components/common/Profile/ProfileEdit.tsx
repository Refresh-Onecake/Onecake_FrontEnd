import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {Button} from '../Button';
import {commonStyles} from '../../../styles/commonStyles';
import {ScreenBottomButton} from '../ScreenBottomButton';

export const ProfileEdit = () => {
  return (
    <SafeAreaView style={styles.view}>
      {/* 이미지 변경 */}
      <View style={styles.imageView}>
        {/* TODO:: uri는 이후 api를 통해 변경할 수 있어야 한다. */}
        <Image
          style={styles.image}
          source={{
            uri: 'https://onecake-image-bucket.s3.ap-northeast-2.amazonaws.com/a9bcd249-5d3c-41bb-b4cf-afcb406b20ee-D446A8F7-4323-4A61-8158-794082BBF508.jpg',
          }}
        />
        <Pressable style={styles.cameraIconView}>
          <Image
            style={styles.cameraIcon}
            source={require('../../../asset/camera.png')}
          />
        </Pressable>
      </View>
      {/* 이름 */}
      <View style={styles.nameView}>
        <TextInput
          underlineColorAndroid="transparent"
          selectionColor={AppStyles.color.hotPink}
          style={styles.nameTextInput}
        />
      </View>
      <Text style={styles.info}>프로필 사진과 닉네임을 입력해주세요.</Text>
      <View style={{flex: 1}} />
      {/* 완료 버튼 */}
      {/* TODO: 하단에 쓰이는 버튼만 컴포넌트로 만들 예정 */}
      <ScreenBottomButton text={'완료'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  imageView: {
    paddingTop: 32.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 144.91,
    height: 144.91,
    borderRadius: 100,
  },
  cameraIconView: {
    top: -30,
    left: 55,
    width: 36.58,
    height: 36.58,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: '#AEAEAE',
    borderRadius: 100,
    backgroundColor: AppStyles.color.white,
  },
  cameraIcon: {
    width: 18,
    height: 18,
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    height: 49.41,
  },
  nameTextInput: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    color: AppStyles.color.black,
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.medium,
      },
    }),
  },
  info: {
    marginTop: 14.37,
    fontSize: 11,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#B1B1B1',
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.medium,
      },
    }),
  },
});
