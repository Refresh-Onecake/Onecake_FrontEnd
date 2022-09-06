import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ICountryCode} from '../../utils';
import {AppStyles} from '../../styles/AppStyles';

type CountryCodeButtonProps = {
  selectedCountry: ICountryCode;
};

export const CountryCodeButton = ({
  selectedCountry,
  ...props
}: CountryCodeButtonProps & TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} style={styles.dropdown}>
      <Text style={styles.dropdownText}>
        {`${selectedCountry.dial_code} ${selectedCountry.code}`}
      </Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name="chevron-down"
          style={{
            color: AppStyles.color.black,
            opacity: 0.5,
            paddingLeft: 3,
          }}
          size={AppStyles.IconSize.small}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: AppStyles.color.lightGray,
    flexDirection: 'row',
    paddingHorizontal: 7,
    borderRadius: 14,
    marginRight: 10,
  },
  dropdownText: {
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.medium,
        lineHeight: 16,
      },
      ios: {},
    }),
    color: AppStyles.color.black,
    opacity: 0.5,
    fontWeight: '500',
    fontSize: 13,
    paddingVertical: 3,
  },
});
