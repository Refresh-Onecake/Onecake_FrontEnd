import {atom} from 'recoil';
import {IStoreMenu} from '../screens/enterMenu';

export const storeMenuState = atom<IStoreMenu>({
  key: 'storeMenuState',
});

export const customerInfoState = atom<string[]>({
  key: 'customerInfoState',
  default: ['주문자 이름', '전화번호', '픽업 날짜 및 시간'],
});

export const cakeInfoState = atom<string[]>({
  key: 'cakeInfoState',
  default: [
    '케이크 맛',
    '배경 색상',
    '레터링 색상',
    '레터링 문구',
    '레퍼런스 사진',
  ],
});
