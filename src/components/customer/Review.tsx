import {Image, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {IReview} from '../../services/storeService';
import {AppStyles} from '../../styles/AppStyles';

export const Review = () => {
  // const renderItem = (item: ListRenderItem<IReview>) => {
  //   <View>
  //     <Image source={{ uri: item.item.profileImg }}}></Image>
  //   <Text>{item.item.userName}</Text>
  //   <Text>{item.item.timeHistory}</Text>
  //   <Text>{item.item.content}</Text>
  //   </View>
  // };

  return (
    // <View>
    //   <FlatList data={data} renderItem={renderItem} />
    // </View>

    <View style={styles.wrapper}>
      <View style={styles.infoWrapper}>
        <Image
          style={styles.image}
          source={require('../../asset/customer.png')}></Image>
        <View style={{marginLeft: 11}}>
          <Text style={{color: AppStyles.color.black}}>송진영</Text>
          <Text style={{color: AppStyles.color.midGray}}>1시간 전</Text>
        </View>
      </View>
      <Text>
        시트가 촉촉하고 정말 맛있습니다! 요청대로 케이크 윗면에 곰돌이 푸 얼굴을
        그려주셨는데 친구들이 아주 좋아했어요! 제가 단걸 잘 못먹는데 여기
        케이크는 딱 적당하게 달아서 좋아요~ 나중에 또 주문할게요!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  wrapper: {
    borderColor: AppStyles.color.border,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 17,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
