import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Home from './Home';
import Stores from './Stores';
import Order from './Order';
import Contact from './Contact';
import MyPage from './MyPage';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon
              name="house-chimney-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="가게"
        component={Stores}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="주문"
        component={Order}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="mdiCalendarMonthOutline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="상담"
        component={Contact}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="comment-dots" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="mdiAccountCircleOutline "
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
