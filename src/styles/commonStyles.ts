import {Platform, StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: 1, width: 0},
        shadowOpacity: 0.2,
      },
    }),
  },
});
