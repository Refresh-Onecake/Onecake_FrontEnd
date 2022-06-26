import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import TabView from './TabView';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles} from '../../styles/AppStyles';
import {Button} from '../../components';

export const StoreDetail = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  const titleInfoCard = useRef<SafeAreaView>(null);

  return (
    <>
      {/*TODO: 이미지 받아와야 함*/}
      <Image
        style={styles.image}
        source={require('../../asset/customer.png')}></Image>
      <SafeAreaView
        style={{
          width: '100%',
          height: 145,
          backgroundColor: AppStyles.color.white,
        }}></SafeAreaView>
      <SafeAreaView style={styles.titleInfo} ref={titleInfoCard}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
              marginBottom: 10,
            }}>
            {/*TODO: 받아와야 함*/}
            링링케이크
          </Text>
          {/*TODO: 설명 받아와야 함*/}
          <Text>마포구에 위치한 케이크 가게에요.</Text>
        </View>
        <View style={styles.userOptionWrapper}>
          <View
            style={[
              styles.userOption,
              {borderRightWidth: 1, borderColor: AppStyles.color.border},
            ]}>
            {/*TODO: 눌렀을 때 색 채워지기*/}
            <Icon
              size={18}
              name="heart-outline"
              style={styles.margiRight}></Icon>
            {/*TODO: 개수 받아와야 함*/}
            <Text style={styles.margiRight}>찜</Text>
            <Text>141</Text>
          </View>
          <View style={styles.userOption}>
            <Icon
              size={18}
              name="heart-outline"
              style={styles.margiRight}></Icon>
            {/*TODO: 개수 받아와야 함*/}
            <Text style={styles.margiRight}>리뷰</Text>
            <Text>1234</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 280,
  },
  titleInfo: {
    top: 250,
    position: 'absolute',
    width: 360,
    height: 153,
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: AppStyles.padding.small,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  userOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  margiRight: {
    marginRight: 5,
  },
  OrderBtnWrapper: {
    backgroundColor: AppStyles.color.white,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    height: 105,
    alignSelf: 'center',
  },
  OrderBtn: {
    height: 44,
    width: 344,
    marginTop: 13,
    alignSelf: 'center',
  },
});
// import * as React from 'react';
// import {View, useWindowDimensions} from 'react-native';
// import {TabView, SceneMap} from 'react-native-tab-view';

// const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

// const SecondRoute = () => (
//   <View style={{flex: 1, backgroundColor: '#673ab7'}} />
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

// export default function TabViewExample() {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'first', title: 'First'},
//     {key: 'second', title: 'Second'},
//   ]);

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{width: layout.width}}
//     />
//   );
// }
