import {IStoreImg} from '../enterStore';

export type IEnterMenuInputForm = {
  cakeSize: string;
  cakePrice: string;
  cakeDescription: string;
  cakeTaste: string;
  cakeImage: IStoreImg;
};

export type IEnterSheetInputForm = {
  consumerInput?: string[];
  cakeInput?: string[];
};

export type IFetchMenu = {
  cakeSize: string;
  cakePrice: string;
  cakeDescription: string;
  cakeTaste: string;
  consumerInput?: string[];
  cakeInput?: string[];
  cakeImage? : string;
};
