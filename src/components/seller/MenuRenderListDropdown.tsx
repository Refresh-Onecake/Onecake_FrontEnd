import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import Modal from 'react-native-modal';
import {commonStyles} from '../../styles/commonStyles';
type MenuRenderListDropdownProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownTop: number;
  dropdownWidth: number;
  dropdownLeft: number;
};

export const MenuRenderListDropdown: FC<MenuRenderListDropdownProps> = ({
  visible,
  setVisible,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut={'fadeOut'}
      onBackdropPress={() => setVisible(false)}
      backdropColor="none">
      <SafeAreaView
        style={[
          {
            top: dropdownTop,
            width: dropdownWidth,
            left: dropdownLeft,
          },
          styles.modalView,
          commonStyles.shadow,
        ]}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={[
            styles.item,
            {
              borderBottomWidth: 1,
              paddingTop: 23,
              borderBottomColor: AppStyles.color.border,
            },
          ]}>
          <Text style={styles.text}>메뉴 수정하기</Text>
          <Image style={styles.img} source={require('../../asset/edit.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={[styles.item, {paddingTop: 13}]}>
          <Text style={styles.text}>메뉴 삭제하기</Text>
          <Image
            style={styles.img}
            source={require('../../asset/delete.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    borderRadius: 13,
    width: 185.44,
    height: 106.97,
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 13,
    marginHorizontal: 12.89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 17,
    height: 17,
  },
  text: {
    fontWeight: '500',
    flex: 1,
    fontSize: 15,
    color: AppStyles.color.black,
  },
});
