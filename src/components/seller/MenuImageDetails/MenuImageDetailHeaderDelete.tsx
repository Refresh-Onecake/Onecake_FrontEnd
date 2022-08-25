import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDeleteMenuImageDetailQuery} from '../../../hooks';
import {useRecoilValue} from 'recoil';
import {menuImageDetailState} from '../../../recoil/atom';
import {useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';

export const MenuImageDetailHeaderDelete = () => {
  const useMenuImageDetailItem = useRecoilValue(menuImageDetailState);
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const menuImageDetailDeleteMutation = useDeleteMenuImageDetailQuery(
    useMenuImageDetailItem.menuId,
    useMenuImageDetailItem.imageId,
    'DELETE',
    queryClient,
    navigation,
  );

  const onClickDelete = () => {
    menuImageDetailDeleteMutation.mutate();
  };
  return (
    <TouchableOpacity onPress={onClickDelete}>
      <Image
        source={require('../../../asset/delete.png')}
        style={styles.delete}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  delete: {
    width: 22,
    height: 22,
  },
});
