import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowDown from '../asset/arrow_down.svg';
import FilterIcon from '../asset/filter.svg';
import StoreHeart from '../asset/store_heart.svg';
import React, {useRef, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import InfoModal from '../components/common/InfoModal';
import {BottomSheet, Button} from '../components/common';

type storeListData = {
  city: string;
  storeName: string;
  imagePath: ImageSourcePropType;
  like: number;
};

const storeFilterData = ['인기순', '리뷰 많은 순'];

const storeListData = [
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage1.png'),
    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage2.png'),

    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage3.png'),

    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage1.png'),
    like: 395,
  },

  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage2.png'),

    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage3.png'),
    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage1.png'),

    like: 395,
  },
  {
    city: '마포구',
    storeName: '링링케이크',
    imagePath: require('../asset/storeImage2.png'),
    like: 395,
  },
];

const ConsumerStoreScreen = () => {
  const [filterMode, setFilterMode] = useState('인기순');
  const [selectFilterMode, setSelectFilterModel] = useState('인기순');
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handlePressItemHeart = () => {
    setModalVisible(true);
  };

  const handlePressFilterSelectButton = () => {
    setBottomSheetVisible(true);
  };

  const handlePressFilterAcceptButton = () => {
    setFilterMode(selectFilterMode);
    setBottomSheetVisible(false);
  };

  const handlePressFilterItem = (filterMode: string) => {
    setSelectFilterModel(filterMode);
  };

  const RenderBottomSheetItem = ({data}: {data: string}) => {
    return (
      <TouchableOpacity
        style={styles.bottomSheetItemView}
        onPress={() => handlePressFilterItem(data)}>
        <Text style={styles.bottomSHeetText}>{data}</Text>
        {data === selectFilterMode && (
          <Image
            style={{width: 11, height: 11}}
            source={require('../asset/check_Icon_default_active.png')}
          />
        )}
      </TouchableOpacity>
    );
  };

  const RenderItem = ({data}: {data: storeListData}) => {
    return (
      <View style={styles.itemWrapper}>
        <View>
          <Image style={styles.itemImage} source={data.imagePath} />
          <TouchableOpacity onPress={handlePressItemHeart}>
            <StoreHeart style={styles.itemHeart} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageTitle}>
          <Text style={{color: AppStyles.color.black}}>[{data.city}] </Text>
          <Text style={{color: AppStyles.color.black}}>{data.storeName}</Text>
        </View>
        <Text style={styles.like}>찜 {data.like}개</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* NOTE header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerFilter}>
          <View style={{width: 10.18, height: 10.18}} />
          <Text style={styles.headerHideFilterText}>{filterMode}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerLocal}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.headerLocalText}>마포구</Text>
          <ArrowDown />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerFilter}
          onPress={handlePressFilterSelectButton}>
          <FilterIcon />
          <Text style={styles.headerFilterText}>{filterMode}</Text>
        </TouchableOpacity>
      </View>
      {/* NOTE Content */}
      <View style={styles.contentView}>
        <FlatList
          data={storeListData}
          numColumns={2}
          renderItem={({item}) => <RenderItem data={item} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <InfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <BottomSheet
        modalVisible={bottomSheetVisible}
        setModalVisible={setBottomSheetVisible}
        height={220}>
        <View style={styles.bottomSheetView}>
          <FlatList
            data={storeFilterData}
            renderItem={({item}) => <RenderBottomSheetItem data={item} />}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: AppStyles.color.border,
                  height: 1,
                  marginVertical: 19,
                }}
              />
            )}
          />
          <View
            style={{
              width: '100%',
              height: 44,
              justifyContent: 'center',
              marginBottom: 30.09,
            }}>
            <Button text="확인" onPress={handlePressFilterAcceptButton} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ConsumerStoreScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'android' ? 44.13 : 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerLocal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLocalText: {
    marginRight: 5,
    color: AppStyles.color.black,
    fontSize: 15,
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
  },
  headerFilterLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerFilterText: {
    marginLeft: 5.05,
    color: AppStyles.color.hotPink,
    fontSize: 15,
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
  },
  headerHideFilterText: {
    marginLeft: 5.05,
    color: AppStyles.color.white,
    fontSize: 15,
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
  },
  contentView: {
    marginTop: 23.63,
    marginHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    marginRight: 13.73,
  },
  itemImage: {
    marginBottom: 9.4,
    width: 165.07,
    height: 214.58,
    borderRadius: 15,
  },
  imageTitle: {
    marginLeft: 3,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.light,
      },
    }),
  },
  like: {
    marginLeft: 3,
    marginBottom: 11.88,
    color: AppStyles.color.nonActiveIcon,
    fontWeight: '400',
    fontSize: 11,
  },
  itemHeart: {
    position: 'absolute',
    bottom: 20,
    right: 9,
  },
  bottomSheetView: {
    flex: 1,
    width: '90%',
  },
  bottomSHeetText: {
    fontSize: 15,
    color: AppStyles.color.black,
    fontWeight: '600',

    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
  },
  bottomSheetItemView: {flexDirection: 'row', justifyContent: 'space-between'},
});
