import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {RootStackParamList} from './navigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useAsync, useLogoutAndReSignQuery} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import SellerMypage from '../components/seller/SellerMypage';
import {fetchLogout} from '../services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyPage = () => {
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.view}>
      <View>
        <Text style={styles.title}>마이페이지</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            navigation.navigate('StackNavigator', {
              screen: 'Setting',
            })
          }>
          <Icon name="cog" size={25} color="grey" />
        </TouchableOpacity>
      </View>
      {role === appKeys.seller ? <SellerMypage /> : <View></View>}
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white, paddingTop: 45},
  title: {
    fontSize: 15,
    color: AppStyles.color.black,
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Bold',
        lineHeight: 30,
      },
      ios: {},
    }),
  },
  icon: {
    position: 'absolute',
    right: 0,
    marginRight: 15,
  },
});
