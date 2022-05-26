import { Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { counter } from '../recoil';

const Home = () => {
	const [count, setCount] = useRecoilState(counter);
	return (
		<SafeAreaProvider style={styles.view}>
			<Pressable>
				<Text onPress={() => setCount(count+1)}>1 증가</Text>
			</Pressable>
			<Pressable>
				<Text onPress={() => setCount(count-1)}>1 감소</Text>
			</Pressable>
			<Text>{count}</Text>
		</SafeAreaProvider>
	);
};

export default Home;

const styles = StyleSheet.create({
	view : {
		padding: 50,
	}
});