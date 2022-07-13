import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ComponentProps, FC, ReactNode} from 'react';
import {AppStyles} from '../../styles/AppStyles';

export type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>;

type ButtonProps = {
  children?: ReactNode;
  text?: string;
  backgroundColor?: string;
  textSize?: number;
};
/**
 * @author min
 * @description 일반적으로 쓰이는 버튼에 대해서 컴포넌트로 구현했습니다.
 * @param {text} text 버튼 내 사용할 문구
 * @param {Props} BackgroundColor Color
 * @param {Props} textSize TextSize
 * @param {Props} Props TouchableOpacity ComponentProps
 *
 * @example
 * 해당 버튼을 담을 뷰의 넓이를 지정해주고 그 안에 버튼을 선언해주면됩니다.
 * <View style={{width: someWidth, height: someHeight}}>
 *   <Button onPress={handleClick}>
 *     <Text>메뉴 추가하기</Text>
 *   </Button>
 * </View>
 *
 * 혹은 텍스트만 선언을 해주어도 됩니다.
 * <View style={{width: someWidth, height: someHeight}}>
 *   <Button text="버튼입니다." onPress={handleClick}/>
 * </View>
 */
export const Button: FC<ButtonProps & TouchableOpacityProps> = ({
  backgroundColor = AppStyles.color.hotPink,
  textSize = AppStyles.font.middle,
  text,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}>
      {text ? (
        <Text
          style={{
            color: AppStyles.color.white,
            fontWeight: '700',
            fontSize: textSize,
          }}>
          {text}
        </Text>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};
