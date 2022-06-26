import {StyleSheet, Image, View, Text, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles} from '../../styles/AppStyles';

export const StoreDetail = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <>
      {/*TODO: 이미지 받아와야 함*/}
      <Image
        style={styles.image}
        source={require('../../asset/customer.png')}></Image>
      <SafeAreaView style={styles.titleInfo}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
            }}>
            {/*TODO: 받아와야 함*/}
            링링케이크
          </Text>
          {/*TODO: 설명 받아와야 함*/}
          <Text>마포구에 위치한 케이크 가게에요.</Text>
        </View>
        <View style={styles.userOption}>
          <Icon size={13} name="heart-outline"></Icon>
          {/*TODO: 개수 받아와야 함*/}
          <Text>찜</Text>
          <Text>141</Text>
          <Icon size={13} name="heart-outline"></Icon>
          {/*TODO: 개수 받아와야 함*/}
          <Text>리뷰</Text>
          <Text>1234</Text>
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
    width: 342,
    height: 153,
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  userOption: {
    flexDirection: 'row',
  },
});
