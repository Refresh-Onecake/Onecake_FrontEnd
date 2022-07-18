import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {commonStyles} from '../../styles/commonStyles';
import {Button} from './Button';
import {AppStyles} from '../../styles/AppStyles';

type InfoModalProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
  subTitle?: string;
};

/**
 * @Author min
 * @description 간단한 안내 메시지를 표시할때 사용합니다.
 * @param modalVisible boolean
 * @param setModalVisible Dispatch<SetStateAction<boolean>>
 * @param title 모달 상단에 표시해줄 텍스트
 * @param subTitle 모달 본문 텍스트
 */
const InfoModal: FC<InfoModalProps> = ({
  modalVisible,
  setModalVisible,
  title = '런칭 준비중',
  subTitle = '해당 기능은 현재 런칭 준비중입니다.',
}) => {
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <SafeAreaView style={styles.centeredView}>
        <View style={[styles.modalView, commonStyles.shadow]}>
          <Image
            style={{width: 53, height: 53, marginTop: 43}}
            source={require('../../asset/checkIcon.png')}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{subTitle}</Text>

          <View style={styles.flex} />
          <TouchableOpacity
            style={styles.btnWrap}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.btnText}>확인</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  flex: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 300,
    width: 345,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnWrap: {
    width: '100%',
    height: 48,
    backgroundColor: AppStyles.color.hotPink,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 19,
    fontWeight: '700',
    color: AppStyles.color.white,
  },
  title: {
    paddingTop: 32.6,
    paddingBottom: 24.39,
    fontWeight: '700',
    fontSize: 23,
    color: AppStyles.color.black,
  },
  text: {
    color: '#818181',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 23,
  },
});
