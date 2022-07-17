import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../styles/AppStyles';

export type RadioListProps = {
  renderList: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
};
export const RadioList: FC<RadioListProps> = ({
  renderList,
  setSelectedItem,
  selectedItem,
}) => {
  return (
    <View style={styles.view}>
      {renderList.length > 0 &&
        renderList.map((val, idx) => (
          <View key={idx} style={styles.item}>
            {
              <Image
                style={{width: 18, height: 18}}
                source={
                  selectedItem === val
                    ? require('../../asset/radio_active.png')
                    : require('../../asset/radio_none.png')
                }
              />
            }
            <TouchableOpacity onPress={() => setSelectedItem(val)}>
              <Text style={styles.text}>{val}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingHorizontal: 25,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: AppStyles.color.black,
    marginLeft: 18,
    textAlign: 'center',
  },
});
