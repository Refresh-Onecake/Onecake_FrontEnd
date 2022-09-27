import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IMenuList} from '../../../api';
import {AppStyles} from '../../../styles/AppStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import {MenuRenderListItem} from './MenuRenderListItem';

export type MenuRenderListProps = {
  data: IMenuList[] | undefined;
};

export const MenuRenderList = ({data}: MenuRenderListProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.view]}>
      <ScrollView style={styles.listWrap}>
        {data &&
          data.map((val, idx) => (
            <MenuRenderListItem
              menuId={val.id}
              key={idx}
              idx={idx}
              menuName={val.menuName}
              menuDescription={val.menuDescription}
              price={val.price}
              image={val.image}
            />
          ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.shadowView, styles.btn]}
        onPress={() =>
          navigation.navigate('StackNavigator', {
            screen: 'EnterMenu',
          })
        }>
        <Image
          source={require('../../../asset/plus_btn_gray.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 24.24,
  },
  shadowView: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: 1, width: 0},
        shadowOpacity: 0.16,
      },
    }),
  },
  listWrap: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
    borderRadius: 13,
  },
  btn: {
    marginTop: 21,
    height: 70,
    backgroundColor: AppStyles.color.white,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
