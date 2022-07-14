import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../styles/AppStyles';

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
    <Modal visible={visible} transparent animationType="none">
      <SafeAreaView
        style={[
          {
            top: dropdownTop,
            width: dropdownWidth,
            left: dropdownLeft,
          },
          styles.modalView,
        ]}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text>안녕</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: {height: 4, width: 0},
        shadowOpacity: 0.5,
      },
    }),
    position: 'absolute',
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    borderRadius: 13,
  },
});
