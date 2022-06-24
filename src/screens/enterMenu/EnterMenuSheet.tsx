import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {ToggleList} from '../../components';
import {useSetRecoilState} from 'recoil';
import {cakeInfoState, customerInfoState} from '../../recoil/atom';

export const EnterMenuSheet = () => {
  // 추가했을 때 보여져야하는 목록
  const [customerInfoList, setCustomerInfoList] = useState<string[]>([]);

  return (
    <Fragment>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 18,
              color: AppStyles.color.black,
              marginBottom: 10,
              fontWeight: '500',
            }}>
            주문서 항목 선택
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: AppStyles.color.black,
              opacity: 0.5,
              fontWeight: '500',
            }}>
            주문서에 들어갈 항목을 선택해주세요.
          </Text>
        </View>
        <View style={{marginTop: 6}}>
          <ToggleList
            title="소비자 정보 항목"
            atomState={cakeInfoState}
            setPicked={setCustomerInfoList}
            picked={customerInfoList}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{backgroundColor: AppStyles.color.hotPink, flex: 0}}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    paddingBottom: 20,
  },
});
