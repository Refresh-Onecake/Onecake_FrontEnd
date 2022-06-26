import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {TouchableOpacityProps} from '../common/Button';
import {AppStyles} from '../../styles/AppStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RecoilState, useRecoilState} from 'recoil';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';

type Props = {
  title: string;
  atomState: RecoilState<string[]>;
  setPicked: React.Dispatch<React.SetStateAction<string[]>>;
  picked: string[];
};
export const ToggleList: FC<Props> = ({
  title,
  setPicked,
  picked,
  atomState,
}) => {
  const [list, setList] = useRecoilState(atomState);
  const handleItemClick = (item: string) => {
    picked.includes(item)
      ? setPicked(prev => prev.filter(val => val !== item))
      : setPicked(prev => [...prev, item]);
  };
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newDataListItem, setNewDataListItem] = useState<string>('');

  const handleAddIconClick = () => {
    setShowInput(!showInput);
  };
  const autoFocus = useAutoFocus();
  return (
    <View style={[styles.view]}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={handleAddIconClick}>
            <Image
              source={require('../../asset/plus_add_circle.png')}
              style={{width: 18, height: 18}}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 15}}>
          {list.map((val, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.item}
              onPress={() => handleItemClick(val)}>
              <View style={{marginRight: 15}}>
                <Image
                  style={styles.checkIcon}
                  source={
                    picked.includes(val)
                      ? require('../../asset/check_box_active.png')
                      : require('../../asset/check_box_none.png')
                  }
                />
              </View>
              <Text style={styles.itemText}>{val}</Text>
            </TouchableOpacity>
          ))}
          {showInput && (
            <View style={[styles.item, {height: 40}]}>
              <View style={{marginRight: 15}}>
                <Image
                  style={styles.checkIcon}
                  source={require('../../asset/check_box_none.png')}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.flex, {color: AppStyles.color.black}]}
                  placeholder="새로운 항목 추가하기"
                  selectionColor={AppStyles.color.placeholder}
                  placeholderTextColor={AppStyles.color.placeholder}
                  onChangeText={setNewDataListItem}
                  onSubmitEditing={() =>
                    setList(prev => [...prev, newDataListItem])
                  }
                  onFocus={autoFocus}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    paddingTop: 19,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
  },
  title: {
    fontSize: 18,
    color: AppStyles.color.black,
    fontWeight: '500',
    paddingRight: 8,
  },
  flex: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 15,
    alignItems: 'center',
  },
  checkIcon: {
    width: 22,
    height: 22,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 15,
    color: AppStyles.color.black,
    opacity: 0.5,
  },
  inputWrap: {
    height: 40,
    borderBottomWidth: 1,
    flex: 1,
    borderColor: AppStyles.color.hotPink,
  },
});
