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
