import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';
import {autoLogin} from '../../store/actions/userAction';

function Splash(props) {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <View>
      <Text>스플래쉬 화면</Text>
    </View>
  );
}

export default Splash;
