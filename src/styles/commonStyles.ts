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
  lightShadow: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 7,
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.11,
      },
    }),
  },
  shadowTop: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: -20, width: 0},
        shadowOpacity: 0.05,
      },
    }),
  },
});
