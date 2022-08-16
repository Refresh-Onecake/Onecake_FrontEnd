import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../styles/AppStyles';

export type RadioListProps = {
  renderList: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
};
/**
 *
 * @param renderList 전체 리스트 목록 string[]
 * @param setSelectedItem 선택되었을 때 값을 저장할 수 있는 state stringSetState
 * @param selectedItem 선택된 값 string
 */
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
    fontSize: 15,
    lineHeight: 18,
    color: AppStyles.color.black,
    marginLeft: 18,
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Bold',
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
});
