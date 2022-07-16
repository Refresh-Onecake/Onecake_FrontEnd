import {atom} from 'recoil';
import {IEditFetchMenu, IFetchMenu} from '../screens/enterMenu';
import {IRefreshToken} from '../services';
import moment from 'moment';
import {appKeys} from '../enum';
export const storeMenuState = atom<IFetchMenu>({
  key: 'storeMenuState',
});

export const customerInfoState = atom<string[]>({
  key: 'customerInfoState',
  default: ['주문자 이름', '전화번호', '픽업날짜', '픽업시간'],
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

export const accessTokenState = atom<IRefreshToken>({
  key: 'accessTokenState',
  default: {
    accessToken: '',
    refreshToken: '',
  },
});

export const currentYearState = atom<number>({
  key: 'currentYearState',
  default: moment().year(),
});

export const orderListModalState = atom<string>({
  key: 'orderListModalState',
  default: appKeys.orderList,
});

export const orderSheetIdState = atom<number>({
  key: 'orderSheetIdState',
  default: 0,
});

export const menuEditSheetInfoState = atom<IEditFetchMenu>({
  key: 'menuEditSheetInfoState',
  default: {
    cakeSize: '',
    price: 0,
    menuDescription: '',
    taste: '',
    consumerInput: [],
    cakeInput: [],
    cakeImage: '',
  },
});

export const EditTargetMenuIdState = atom<number>({
  key: 'EditTargetMenuIdState',
  default: -1,
});
