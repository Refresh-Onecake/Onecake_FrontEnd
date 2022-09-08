import {
  AppState,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {Button, ModalHeader, RadioList} from '../../common';
import {AppStyles} from '../../../styles/AppStyles';
import {useMenuDetailsImageUpload} from '../../../hooks';
import {useQueryClient} from 'react-query';

type MenuImageAnniversaryModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  img?: {
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  };
  menuId: number;
  imageUri?: string;
};

const AnniversaryList = [
  '생일',
  '월별행사',
  '기념일',
  '취업',
  '결혼',
  '전역',
  '기타',
];

const MenuImageAnniversaryModal: FC<MenuImageAnniversaryModalProps> = ({
  visible,
  setVisible,
  img,
  menuId,
  imageUri,
}) => {
  const [selectAnniversary, setSelectAnniversary] = useState<string>('생일');
  const queryClient = useQueryClient();
  const UploadAnniversaryImageMutation = useMenuDetailsImageUpload(
    menuId,
    imageUri,
    selectAnniversary,
    queryClient,
  );
  const onClickUploadAnniversaryButton = () => {
    UploadAnniversaryImageMutation.mutate();
    setVisible(() => false);
  };
  return (
    <Modal isVisible={visible}>
      <SafeAreaView style={styles.view}>
        <ModalHeader title={'기념일 선택'} setVisible={setVisible} />
        <View style={styles.imageWrap}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </View>
        <View>
          <RadioList
            renderList={AnniversaryList}
            setSelectedItem={setSelectAnniversary}
            selectedItem={selectAnniversary}
          />
        </View>
        <View style={styles.btnWrap}>
          <Button
            onPress={onClickUploadAnniversaryButton}
            text={'선택하기'}
            textSize={15}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MenuImageAnniversaryModal;

const styles = StyleSheet.create({
  view: {
    height: 620,
    backgroundColor: AppStyles.color.white,
    borderRadius: 10,
  },
  imageWrap: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 171.9,
    borderRadius: 8,
    borderWidth: 0.4,
    borderColor: '#B9B9B9',
  },
  btnWrap: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 72,
  },
});
