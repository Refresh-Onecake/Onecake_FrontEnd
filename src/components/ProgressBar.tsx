import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';

import {AppStyles} from '../styles/AppStyles';

type Props = {
  progress: number;
};

/**
 * @author min
 * @description Stack Navigation 상단에 해당 진척상황을 표시해주기 위해 만들었습니다.
 * @param {number} progress progressBar에 색칠될 현재 진척상황
 */

export const ProgressBar: FC<Props> = ({progress = 0}) => {
  return (
    <View style={styles.view}>
      <View style={[styles.progress, {width: `${progress}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 3.14,
    backgroundColor: AppStyles.color.border,
  },
  progress: {
    height: 3.14,
    backgroundColor: AppStyles.color.hotPink,
  },
});
