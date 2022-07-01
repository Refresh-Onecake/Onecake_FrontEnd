import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react';
import {event} from 'react-native-reanimated';

export type BottomSheetProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const BottomSheet: FC<BottomSheetProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  /**
   * @description
   * panY에 따라 BottomSheet의 y축 위치를 결정한다. inputRange의 -1을 outputRange의 0으로 치환하기 때문에 panY가 0보다 작아져도 BottomSheet의 Y축 위치는 변화가 없다.
   */
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  /**
   * @description
   * BottomSheet를 초기 위치로 움직이는 함수
   */
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  /**
   * @description
   * BottomSheet를 내리는 함수
   */
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const closeModal = () => {
    closeBottomSheet.start(() => {
      //BottomSheet가 닫힌 후 Modal이 사라지도록 기능 구현
      setModalVisible(false);
    });
  };

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (e, gestureState) => {
        //BottomSheet에 터치 또는 드래그 이벤트가 발생할 때 실행
        panY.setValue(gestureState.dy); //처음 터치 영역을 기준으로 Y축으로 드래그한 거리를 panY에 저장합니다.
      },
      onPanResponderRelease: (e, gestureState) => {
        //유저가 BottomSheet 손을 뗐을 때 실행
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          // 유저가 y축으로 1.5 이상의 속도로 드래그 했을 때 BottomSheet가 닫히도록 조건을 지정
          closeModal();
        } else {
          resetBottomSheet.start(); //위 조건에 부합하지 않으면 BottomSheet의 위치를 초기화 하도록 설계.
        }
      },
    }),
  ).current;

  useEffect(() => {
    modalVisible && resetBottomSheet.start();
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <Text>This is BottomSheet</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
