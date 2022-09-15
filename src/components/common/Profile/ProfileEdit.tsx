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
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {ScreenBottomButton} from '../ScreenBottomButton';
import {useRecoilState} from 'recoil';
import {profileEditState} from '../../../recoil/atom';
import {handleImageUpload} from '../../../utils';
import {IStoreImg} from '../../../screens/enterStore';
import {useSetUserProfile} from '../../../hooks/Query/Common/useSetUserProfile';
import {
  fetchUploadPicture,
  usePictureMutation,
} from '../../../hooks/Query/Common/usePictureMutation';
import {useQueryClient} from 'react-query';
import {useGetUserProfile} from '../../../hooks/Query/Common';
import {launchImageLibrary} from 'react-native-image-picker';
import InfoModal from '../InfoModal';

export const ProfileEdit = () => {
  const {data} = useGetUserProfile();
  const [storeImg, setStoreImg] = useState<IStoreImg>();
  const [imgUri, setImgUri] = useState(data?.profileImg);
  const [name, setName] = useState(data?.nickname);
  const [infoModalTitle, setInfoModalTitle] = useState([
    '프로필 수정',
    '프로필 수정 정보를 다시 한번 확인해주세요.',
  ]);
  const [infoModal, setInfoModal] = useState(false);

  const queryClient = useQueryClient();
  const setUserProfileMutation = useSetUserProfile(queryClient);
  const pictureMutation = usePictureMutation(setImgUri);

  const onPressCameraBtn = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(resp => {
      resp.assets?.map(({fileName, type, uri}) => {
        const img = {
          name: fileName,
          type: type,
          uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
        };
        pictureMutation.mutate(img);
      });
    });
  };

  const submit = () => {
    if (name === undefined || name === '') {
      setInfoModalTitle(prev => [prev[0], '닉네임을 확인해주세요.']);
      setInfoModal(true);
    } else if (imgUri === undefined) {
      setInfoModalTitle(prev => [prev[0], '프로필 사진을 확인해주세요.']);
      setInfoModal(true);
    } else {
      setUserProfileMutation.mutate({nickname: name, profileImg: imgUri});
      setInfoModalTitle(prev => [prev[0], '변경 되었습니다.']);
      setInfoModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      {/* 이미지 변경 */}
      <View style={styles.imageView}>
        {/* TODO:: uri는 이후 api를 통해 변경할 수 있어야 한다. */}

        <Image
          style={styles.image}
          source={{
            uri: imgUri !== '' ? imgUri : undefined,
          }}
        />

        <Pressable style={styles.cameraIconView} onPress={onPressCameraBtn}>
          <Image
            style={styles.cameraIcon}
            source={require('../../../asset/camera.png')}
          />
        </Pressable>
      </View>
      {/* 이름 */}
      <View style={styles.nameView}>
        <TextInput
          value={name}
          onChangeText={setName}
          underlineColorAndroid="transparent"
          selectionColor={AppStyles.color.hotPink}
          style={styles.nameTextInput}
        />
      </View>
      <Text style={styles.info}>프로필 사진과 닉네임을 입력해주세요.</Text>
      <View style={{flex: 1}} />
      {/* 완료 버튼 */}
      {/* TODO: 하단에 쓰이는 버튼만 컴포넌트로 만들 예정 */}
      <ScreenBottomButton text={'완료'} onPress={submit} />
      <InfoModal
        setModalVisible={setInfoModal}
        modalVisible={infoModal}
        title={infoModalTitle[0]}
        subTitle={infoModalTitle[1]}
      />
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
