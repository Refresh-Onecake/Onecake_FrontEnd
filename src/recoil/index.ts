import { atom } from 'recoil';

export const counter = atom<number>({
	key : 'conter',
	default : 0,
});