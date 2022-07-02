import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import React, {
  cloneElement,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {event} from 'react-native-reanimated';
import {AppStyles} from '../../styles/AppStyles';

export type BottomSheetProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
  height: string;
};

/**
 * @author min
 * @description bottomSheet 입니다.
 * @param modalVisible - modalVisible boolean
 * @param setModalVisible - modalVisible SetState
 * @param bottomSheet 내부에 보일 컴포넌트
 * @param height bottomSheet 높이 입니다. %로 입력해주세요 ex) '90%'
 * @example
  const [modalVisible, setModalVisible] = useState(false);
 *  ...
 *  <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height="95%">
        <View>
          <Text>Hello</Text>
        </View>
      </BottomSheet>
 */
export const BottomSheet: FC<BottomSheetProps> = ({
  modalVisible,
  setModalVisible,
  children,
  height,
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
            height: height,
            transform: [{translateY: translateY}],
          }}>
          <Animated.View
            style={{
              ...styles.bottomSheetContainer,

              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <View style={styles.bar} />
          </Animated.View>
          {cloneElement(children, {
            close: closeModal,
          })}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
  },
  background: {
    flex: 1,
  },
  bar: {
    marginTop: 5.44,
    width: 58.01,
    height: 4.1,
    backgroundColor: '#D7D7D7',
    borderRadius: 30,
    marginBottom: 26,
  },
  bottomSheetContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: AppStyles.color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentView: {},
});
