import {Alert, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {IPickerImg} from '../components/seller/MenuImage';
export const imageUpload: () =>
  | Promise<IPickerImg>
  | Promise<void> = async () => {
  await launchImageLibrary({mediaType: 'photo'})
    .then(resp => {
      resp.assets?.map(({fileName, type, uri}) => {
        const img = {
          name: fileName,
          type: type,
          uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
        };
        return img;
      });
    })
    .catch(() => {
      Alert.alert(
        '사진 업로드 실패',
        '다시 한번 시도해주시거나 관리자에게 문의해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
    });
};
