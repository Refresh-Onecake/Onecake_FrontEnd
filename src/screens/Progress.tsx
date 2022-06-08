
import {Button, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});


const Progress = () => {
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
	const [notification, setNotification] = useState<Notifications.Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	
	useEffect(() => {
		registerForPushNotificationsAsync().then(token => {
			// fetch(PUSH_ENDPOINT, {
			// 	method: 'POST',
			// 	headers: {
			// 		Accept: 'application/json',
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		token: {
			// 			value: token,
			// 		}
			// 	}),
			// })
			// 	.then(() => console.log('send!'))
			// 	.catch((err) => console.log(err));
			setExpoPushToken(token);
		});
	
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});
	
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});
	
		return () => {
			if(typeof notificationListener.current !== 'undefined' && typeof responseListener.current !== 'undefined'){
				Notifications.removeNotificationSubscription(notificationListener.current);
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
				title="Press to schedule a notification"
				onPress={async () => {
					await schedulePushNotification();
				}}
			/>
		</View>
	);
};

export default Progress;

const styles = StyleSheet.create({});

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			sound: 'default',
			title: 'You\'ve got mail! 📬',
			body: 'Here is the notification body',
			data: { data: 'goes here' },
		},
		trigger: { seconds: 2 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('mychannel', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}

