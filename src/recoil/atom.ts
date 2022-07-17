import {atom} from 'recoil';
import {IFetchMenu} from '../screens/enterMenu';
import {IRefreshToken} from '../services';
import moment from 'moment';
import {appKeys, storeTabKeys} from '../enum';
export const storeMenuState = atom<IFetchMenu>({
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

export const storeIdState = atom<number>({
  key: 'storeIdState',
  default: 0,
});

export const currentTabState = atom<string>({
  key: 'currentTabState',
  default: storeTabKeys.menu,
});
