import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';

type HeaderProps = {
  leftOnPress?: () => void;
  rightOnPress?: () => void;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
};
export const Header = ({
  leftOnPress,
  leftIcon,
  rightOnPress,
  rightIcon,
}: HeaderProps) => {
  return (
    <View style={styles.view}>
      {leftIcon ? (
        <TouchableOpacity onPress={leftOnPress}>
          <Image style={styles.image} source={leftIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.image} />
      )}
      <Text style={styles.text}>마이페이지</Text>
      {rightIcon ? (
        <TouchableOpacity onPress={rightOnPress}>
          <Image style={styles.image} source={rightIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.image} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  view: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
    fontWeight: '600',
    color: AppStyles.color.black,
    fontSize: 15,
  },
  image: {
    width: 22,
    height: 22,
  },
});
