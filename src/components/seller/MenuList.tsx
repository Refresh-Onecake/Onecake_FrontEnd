/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {getMenuList} from '../../services/menuService';
import {useQuery} from 'react-query';
import {queryKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {Button} from '../common/Button';
import {RootStackParamList} from '../../screens/navigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IMenuList} from '../../services/menuService';

export const MenuList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const {data, status} = useQuery<IMenuList[]>(
  //   queryKeys.sellerMenuList,
  //   getMenuList,
  //   {
  //     onError: () => {
  //       console.error('뭐지뭐지?');
  //     },
  //     onSuccess: () => {
  //       console.log(data);
  //     },
  //   },
  // );

  // data && data?.length > 0
  return (
    <View>
      {false ? (
        //TODO: 메뉴 데이터가 존재할 때
        <View style={styles.flex}>
          <Text>데이터있음</Text>
        </View>
      ) : (
        // TODO: 메뉴 데이터가 존재하지 않을 때
        <SafeAreaView style={styles.flex}>
          <View>
            <Image
              style={{width: 318, height: 318}}
              source={require('../../asset/menuListNone.png')}
            />
          </View>
          <Text style={styles.title}>아직 등록된 메뉴가 없어요!</Text>

          <View style={styles.btnWrap}>
            <Button
              text="메뉴 추가하기"
              onPress={() =>
                navigation.navigate('StackNavigator', {
                  screen: 'EnterMenu',
                })
              }
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: AppStyles.color.subTitle,
    fontSize: AppStyles.font.middle,
  },
  btnWrap: {
    width: 270,
    height: 44,
    marginTop: 20,
  },
});
