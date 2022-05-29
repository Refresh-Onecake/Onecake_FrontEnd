import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Progress from './Progress';
import MyPage from './MyPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{
			headerShown: false,
			tabBarActiveTintColor: '#e91e63',
		}} >
			<Tab.Screen name='홈' component={Home} options={{
				tabBarLabel: '홈',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="home" color={color} size={size} />
				),
			}}/>
			<Tab.Screen name='검색' component={Search} options={{
				tabBarLabel: '검색',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="magnify" color={color} size={size} />
				),
			}}/>
			<Tab.Screen name='진행상황' component={Progress} options={{
				tabBarLabel: '진행상황',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="calendar-month" color={color} size={size} />
				),
			}}/>
			<Tab.Screen name='마이페이지' component={MyPage} options={{
				tabBarLabel: '마이페이지',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="account" color={color} size={size} />
				),
			}}/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;

const styles = StyleSheet.create({});