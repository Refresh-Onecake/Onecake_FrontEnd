import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet } from 'react-native';
import HomeNavigator from './src/screens/HomeNavigator';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
	return (
		<SafeAreaProvider>
			<RecoilRoot>
				<NavigationContainer>
					<HomeNavigator/>
				</NavigationContainer>
			</RecoilRoot>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});