import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles} from '../../../styles/AppStyles';

type MenuImageUploadItemProps = {
  width: number;
};

export const MenuImageUploadItem: FC<
  MenuImageUploadItemProps & TouchableOpacityProps
> = ({width, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: width,
        backgroundColor: AppStyles.color.border,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}>
      <Icon name="plus" color="#797979" size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
