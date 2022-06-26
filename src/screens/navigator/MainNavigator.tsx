import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Home';
import Stores from '../Stores';
import Order from '../Order';
import Contact from '../Contact';
import MyPage from '../MyPage';

import {AppStyles} from '../../styles/AppStyles';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppStyles.color.hotPink,
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="가게"
        component={Stores}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="storefront-outline" color={color} size={size} />
          ),
          //TODO: role에 따라 다르게 보여야 함.
          headerShown: true,
          headerTitle: '메뉴 관리',
        }}
      />
      <Tab.Screen
        name="주문"
        component={Order}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-month-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="상담"
        component={Contact}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-processing-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
