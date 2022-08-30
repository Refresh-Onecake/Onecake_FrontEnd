import React, {useState} from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import Stores from '../Stores';
import Order from '../Order';
import Contact from '../Contact';
import MyPage from '../MyPage';
import {AppStyles} from '../../styles/AppStyles';
import {useAsync} from '../../hooks';
import {appKeys} from '../../enum';
import {getStringValueFromAsyncStorage} from '../../utils';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      console.log('role', fetchData);
      setRole(fetchData);
    }
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'AppleSDGothicNeoM',
          lineHeight: 16,
        },
        tabBarActiveTintColor: AppStyles.color.hotPink,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowRadius: 9,
              shadowOffset: {height: -20, width: 0},
              shadowOpacity: 0.05,
            },
            android: {
              fontFamily: 'AppleSDGothicNeoM',
            },
          }),
        },
        headerTitleStyle: {
          fontFamily: 'AppleSDGothicNeoM',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/home_active.png')
                    : require('../../asset/home_none.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={role === 'CONSUMER' ? '가게' : '메뉴'}
        component={Stores}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 23.5, height: 23.5}}
                source={
                  focused
                    ? require('../../asset/store_active.png')
                    : require('../../asset/store_none.png')
                }
              />
            );
          },
          headerShown: true,
          headerTitle: role === 'CONSUMER' ? '' : '메뉴 관리',
        }}
      />
      <Tab.Screen
        name="주문"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/calendar_active.png')
                    : require('../../asset/calendar_none.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="상담"
        component={Contact}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../../asset/message_active.png')
                    : require('../../asset/message_none.png')
                }
              />
            );
          },
          headerShown: true,
          headerTitle: '주문 상담',
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/people_active.png')
                    : require('../../asset/people_none.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '600'},
    }),
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
});
