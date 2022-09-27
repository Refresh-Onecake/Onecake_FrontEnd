import {assert} from './assert';

export const convertPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    return phoneNumber.split(' ')[1];
  }
};
