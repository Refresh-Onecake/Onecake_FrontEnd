import {atom} from 'recoil';
import {IStoreMenu} from '../screens/enterMenu';

export const storeMenuState = atom<IStoreMenu>({
  key: 'storeMenuState',
});
