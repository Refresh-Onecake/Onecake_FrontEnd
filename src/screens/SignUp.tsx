import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const TEST_PHONE_NUMBER = '+82 010-4183-2998';

const SignUp = () => {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState<string>('');
  const [validatedPhoneAuth, setValidatedPhoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const convertPhoneNumber = (phoneNumber: string) => {
    const tmpNumber = phoneNumber.replace(/[-\s]/gi, '');
    const prevNum = tmpNumber.substring(0, 3);
    const nextNum = tmpNumber.substring(4, tmpNumber.length);
    return prevNum + nextNum;
  };
  const confirmCode = async () => {
    try {
      await confirm
        ?.confirm(code)
        .then(res => {
          const validatedNumber = res?.user.phoneNumber;
          validatedNumber === TEST_PHONE_NUMBER
            ? setValidatedPhoneAuth(true)
            : setValidatedPhoneAuth(false);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const signInWithPhoneNumber = async (number: string) => {
    await auth()
      .signInWithPhoneNumber(number)
      .then(res => {
        setConfirm(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  if (!confirm) {
    return (
      <>
        <TextInput
          placeholder="전화번호를 입력해주시라요~ (이렇게 +82 010-4183-2998))"
          onChangeText={setPhoneNumber}
        />
        <Button
          title="핸드폰 문자인증 기능입니다.! TEST_PHONE_NUMBER로 문자가 갑니다!"
          onPress={() => signInWithPhoneNumber(TEST_PHONE_NUMBER)}
        />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button
        title="인증 코드를 입력해주시고 눌러주세요"
        onPress={() => confirmCode()}
      />
      {validatedPhoneAuth ? (
        <Text>인증 성공~</Text>
      ) : (
        <Text>응~ 인증 실패</Text>
      )}
      <Text>{convertPhoneNumber(TEST_PHONE_NUMBER)}</Text>
    </SafeAreaProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
