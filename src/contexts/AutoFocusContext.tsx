import {View, Text, findNodeHandle} from 'react-native';
import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import React, {createContext, useCallback, useContext, useRef} from 'react';
import type {FC, ComponentProps} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export type AutoFocusContextType = {
  autoFocus: (event: FocusEvent) => void;
};

const defaultFocusContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  autoFocus: (event: FocusEvent) => {},
};

const AutoFocusContext =
  createContext<AutoFocusContextType>(defaultFocusContext);

export type AutoFocusProviderProps = ComponentProps<
  typeof KeyboardAwareScrollView
>;

/**
 * @author min
 * @description KeyboardAwareScrollView를 사용하기 위한 컴포넌트 입니다.
 * @example  
 * 해당 코드를 KeyboardAwareScrollView를 사용하고자 하는 컴포넌트 상단에 선언해주세요.
  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();
  
  ...
  
  <View>
    <AutoFocusProvider contentContainerStyle={styles.flex} > //이떄 flex 는 flex : 1을 담고 있음
      <TextInput onFocus={autoFocus}/>
    </AutoFocusProvider>
  </View>
 */
export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
  children,
  ...props
}) => {
  const scrollRef = useRef<KeyboardAwareScrollView | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollToInput = useCallback((reactNode: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    scrollRef.current?.scrollToFocusedInput(reactNode);
  }, []);

  const autoFocus = useCallback((event: FocusEvent) => {
    scrollToInput(findNodeHandle(event.target));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {autoFocus};
  return (
    <AutoFocusContext.Provider value={value}>
      <KeyboardAwareScrollView
        {...props}
        style={{flex: 1, width: '100%'}}
        ref={scrollRef}>
        {children}
      </KeyboardAwareScrollView>
    </AutoFocusContext.Provider>
  );
};

export const useAutoFocus = () => {
  const {autoFocus} = useContext(AutoFocusContext);
  return autoFocus;
};
