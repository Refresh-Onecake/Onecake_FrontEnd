import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

const Contact = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>Contact</Text>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});
