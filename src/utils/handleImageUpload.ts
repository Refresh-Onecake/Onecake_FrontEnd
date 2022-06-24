import {Alert, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {IStoreImg} from '../screens/enterStore';

/**
 * @author min
 * @description react-native-image-picker를 활용하여 저장된 사진을 가져올때 활용됩니다.
 * @param setter 사진을 담기위한 setStateAction을 넘겨줍니다.
 * @example
  const [storeImg, setStoreImg] = useState<IStoreImg>();

  useState를 상단에 선언해준 뒤 아래와 같이 onPress 등에 담아 사용 가능합니다.
  <TouchableOpacity 
    onPress={() => handleImageUpload(setStoreImg)}/>
 * 
 */

export const handleImageUpload = async (
  setter: React.Dispatch<React.SetStateAction<IStoreImg | undefined>>,
) => {
  await launchImageLibrary({mediaType: 'photo'})
    .then(resp => {
      resp.assets?.map(({fileName, type, uri}) => {
        const img = {
          name: fileName,
          type: type,
          uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
        };
        setter(img);
      });
    })
    .catch(() => {
      setter(undefined);
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
