import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {MenuImageUploadItem} from './MenuImageUploadItem';
import {launchImageLibrary} from 'react-native-image-picker';
import MenuImageAnniversaryModal from './MenuImageAnniversaryModal';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pickImage, SetPickImage] = useState<IPickerImg>();

  const ModalToggle = () => {
    setModalVisible(!modalVisible);
    console.log(menuId);
  };
  const uploadImg = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(resp => {
        resp.assets?.map(({fileName, type, uri}) => {
          const img = {
            name: fileName,
            type: type,
            uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
          };
          SetPickImage(img);
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

  return (
    <View style={styles.view}>
      {item.id < 0 ? (
        <MenuImageUploadItem width={width} onPress={uploadImg} />
      ) : (
        <Image
          source={{uri: item.image}}
          style={{width: width, height: width}}
        />
      )}
      <MenuImageAnniversaryModal
        visible={modalVisible}
        setVisible={setModalVisible}
        img={pickImage}
        menuId={menuId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {paddingBottom: 2, paddingRight: 2},
});
