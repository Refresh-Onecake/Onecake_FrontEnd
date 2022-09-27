import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {MenuImageUploadItem} from './MenuImageUploadItem';
import {launchImageLibrary} from 'react-native-image-picker';
import MenuImageAnniversaryModal from './MenuImageAnniversaryModal';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import {useSetRecoilState} from 'recoil';
import {menuImageDetailState} from '../../../recoil/atom';
import {useMutation} from 'react-query';
import {IStoreImg} from '../../../screens/enterStore';
import {fetchEnterPicture, refetchToken} from '../../../api';
import {getMultipleData} from '../../../../App';

type MenuImageItemProps = {
  item: {
    id: number;
    image: string;
  };
  index: number;
  width: number;
  menuId: number;
};

export type IPickerImg = {
  name: string | undefined;
  type: string | undefined;
  uri: string | undefined;
};

export const MenuImageItem: FC<MenuImageItemProps> = ({
  item,
  index,
  width,
  menuId,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pickImage, SetPickImage] = useState<IPickerImg>();
  const [imageUri, setImageUri] = useState<string>();
  const setMenuDetailItem = useSetRecoilState(menuImageDetailState);

  const ModalToggle = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const pictureMutation = useMutation(
    async (pictureObj: IStoreImg) =>
      await fetchEnterPicture(pictureObj).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
        } else {
          if (res) return res.text();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log('사진등록 성공');
        setImageUri(data);
      },
      onError: e => {
        console.log(e);
      },
    },
  );

  const uploadImg = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(resp => {
        resp.assets?.map(({fileName, type, uri}) => {
          const img = {
            name: fileName,
            type: type,
            uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
          };
          pictureMutation.mutate(img);
          ModalToggle();
        });
      })
      .catch(() => {
        Alert.alert(
          '사진 업로드 실패',
          '다시 한번 시도해주시거나 관리자에게 문의해주세요.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
        );
      });
  };

  const onClickImage = () => {
    setMenuDetailItem({
      menuId: menuId,
      imageId: item.id,
      image: item.image,
    });
    navigation.navigate('MenuImageDetails');
  };

  return (
    <View style={styles.view}>
      {item.id < 0 ? (
        <MenuImageUploadItem width={width} onPress={uploadImg} />
      ) : (
        <TouchableOpacity onPress={onClickImage}>
          <Image
            source={{uri: item.image}}
            style={{width: width, height: width}}
          />
        </TouchableOpacity>
      )}
      <MenuImageAnniversaryModal
        visible={modalVisible}
        setVisible={setModalVisible}
        img={pickImage}
        imageUri={imageUri}
        menuId={menuId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {paddingBottom: 2, paddingRight: 2},
});
