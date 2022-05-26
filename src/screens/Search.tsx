import { SafeAreaView, StyleSheet, Text, } from 'react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { counter } from '../recoil';
const Search = () => {
	const count = useRecoilValue(counter);
	return (
		<SafeAreaView>
			<Text>{count}</Text>
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({});