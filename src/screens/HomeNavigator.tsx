import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Progress from './Progress';
import MyPage from './MyPage';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{
			headerShown: false
		}} >
			<Tab.Screen name='홈' component={Home}/>
			<Tab.Screen name='검색' component={Search}/>
			<Tab.Screen name='진행상황' component={Progress}/>
			<Tab.Screen name='마이페이지' component={MyPage}/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;

const styles = StyleSheet.create({});