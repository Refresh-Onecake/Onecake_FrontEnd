import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../styles/AppStyles';
import {currentTabState} from '../../recoil/atom';
import {storeTabKeys} from '../../enum/storeTabKeys';
import {CakeList, StoreInfo, Review} from '../../components';

const phoneWidth = Dimensions.get('window').width;
const TabIndicatorWidth = (phoneWidth / 3).toFixed();
const tabList = ['메뉴', '가게 정보', '리뷰'];
export const TabView = () => {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        {tabList.map((val, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.indicator}
            onPress={() => {
              setCurrentTab(val);
            }}>
            <Text>{val}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: AppStyles.color.white}} />
      <View style={styles.selectedView}>
        {
          {
            [storeTabKeys.menu]: <CakeList />,
            [storeTabKeys.storeInfo]: <StoreInfo />,
            [storeTabKeys.review]: <Review />,
          }[currentTab]
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: AppStyles.color.white,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.white,
    width: +TabIndicatorWidth,
    height: 47,
  },
  selectedView: {
    width: '100%',
    height: '39%',
    backgroundColor: AppStyles.color.white,
  },
});
