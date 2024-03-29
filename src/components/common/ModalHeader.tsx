import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, SetStateAction} from 'react';
import {AppStyles} from '../../styles/AppStyles';

export type ModalHeaderProps = {
  title: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 *
 * @param title : Modal 제목
 * @param setVisible : Modal의 활성화를 관리하는 state
 */
export const ModalHeader: FC<ModalHeaderProps> = ({title, setVisible}) => {
  return (
    <View style={styles.view}>
      <View style={{width: 13, height: 13}} />
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={() => setVisible(false)}>
        <Image
          source={require('../../asset/close_X.png')}
          style={{width: 13, height: 13}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 23.22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
});
