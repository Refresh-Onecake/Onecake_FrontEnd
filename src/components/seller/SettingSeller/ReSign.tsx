import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {Button} from '../../common/Button';
import {commonStyles} from '../../../styles/commonStyles';
import {
  useAsync,
  useGetMemberInfoQuery,
  useLogoutAndReSignQuery,
} from '../../../hooks';
import {fetchResign} from '../../../services';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import {useQueryClient} from 'react-query';

export const ReSign = () => {
  const queryClient = useQueryClient();
  const {data} = useGetMemberInfoQuery(queryClient);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const resignMutation = useLogoutAndReSignQuery(fetchResign, navigation);

  const onClickResign = () => {
    console.log('탈퇴하기');
    resignMutation.mutate();
  };
  return (
    <Fragment>
      <SafeAreaView style={styles.wrap}>
        <Text style={styles.title}>
          {data && data.userName}님과 이별이라니 너무 아쉬워요.
        </Text>
        <Text style={styles.subTitle}>
          계정을 삭제하면 모든 활동 정보가 사라집니다. 진짜로 탈퇴하시겠어요?
        </Text>
        <View style={{flex: 1}} />
        <View style={[styles.view, commonStyles.shadowTop]}>
          <View style={[styles.btnWrap]}>
            <Button text="탈퇴하기" onPress={onClickResign} />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: AppStyles.color.black,
    paddingTop: 21,
    paddingLeft: 15,
  },
  subTitle: {
    paddingTop: 14,
    paddingLeft: 15,
    paddingRight: 28,
    fontSize: 14.5,
    fontWeight: '400',
    color: '#3E3E3E',
  },
  view: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingTop: 13,
    marginTop: 10,
    justifyContent: 'space-around',
    backgroundColor: AppStyles.color.white,
  },
  btnWrap: {
    padding: 7,
    flex: 1,
    height: 60,
  },
});
