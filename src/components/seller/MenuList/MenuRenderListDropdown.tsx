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
import React, {FC, useCallback, useEffect} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import Modal from 'react-native-modal';
import {commonStyles} from '../../../styles/commonStyles';
import {
  QueryClient,
  useMutation,
  useQueries,
  useQueryClient,
} from 'react-query';
import {getMultipleData} from '../../../../App';
import {queryKeys} from '../../../enum';
import {useGetSellerMenuSheetByMenuId} from '../../../hooks/useGetSellerMenuSheetByMenuId';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {menuEditSheetInfoState} from '../../../recoil/atom';
import {IEditFetchMenu, IFetchMenu} from '../../../screens/enterMenu';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import {deleteMenu, refetchToken} from '../../../services';
type MenuRenderListDropdownProps = {
  menuId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownTop: number;
  dropdownWidth: number;
  dropdownLeft: number;
};

export const MenuRenderListDropdown: FC<MenuRenderListDropdownProps> = ({
  menuId,
  visible,
  setVisible,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const menuDeleteMutation = useMutation(
    async (menuId: number) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await deleteMenu(menuId).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeys.sellerMenuList);
      },
      onError: e => {
        console.log(e);
      },
    },
  );

  const {data, refetch} = useGetSellerMenuSheetByMenuId(queryClient, menuId);

  const onClickDeleteMenu = useCallback(() => {
    menuDeleteMutation.mutate(menuId);
    setVisible(false);
  }, [menuId]);

  const onClickEditMenu = () => {
    refetch();
    setVisible(false);
    navigation.navigate('EnterMenu');
  };

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
          // TODO: 메뉴 수정
          onPress={onClickEditMenu}
          style={[
            styles.item,
            {
              borderBottomWidth: 1,
              paddingTop: 23,
              borderBottomColor: AppStyles.color.border,
            },
          ]}>
          <Text style={styles.text}>메뉴 수정하기</Text>
          <Image
            style={styles.img}
            source={require('../../../asset/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClickDeleteMenu}
          style={[styles.item, {paddingTop: 13}]}>
          <Text style={styles.text}>메뉴 삭제하기</Text>
          <Image
            style={styles.img}
            source={require('../../../asset/delete.png')}
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
    height: 18,
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        lineHeight: 17,
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
});
