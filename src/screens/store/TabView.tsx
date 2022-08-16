import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
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
      <View style={styles.wrapper}>
        {tabList.map((val, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              setCurrentTab(val);
            }}
            style={[
              styles.indicator,
              currentTab === val
                ? styles.seletedIndicator
                : styles.unSelectedIndicator,
            ]}>
            <Text
              style={{
                fontSize: 13,
                ...Platform.select({
                  android: {
                    fontFamily: 'NotoSansKR-Medium',
                  },
                  ios: {},
                }),
              }}>
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: '#F4F4F4',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.white,
    width: +TabIndicatorWidth,
    marginTop: 10,
    height: 47,
  },
  selectedView: {
    width: '100%',
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  seletedIndicator: {
    borderTopColor: AppStyles.color.hotPink,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRightColor: AppStyles.color.lightGray,
    borderLeftColor: AppStyles.color.lightGray,
  },
  unSelectedIndicator: {
    borderBottomColor: AppStyles.color.lightGray,
    borderBottomWidth: 1,
  },
});
