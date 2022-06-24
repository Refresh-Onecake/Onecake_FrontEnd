import {IStoreImg} from '../enterStore';

export type IEnterMenuInputForm = {
  cake_size: string;
  cake_price: string;
  cake_description: string;
  cake_taste: string;
  cake_image: IStoreImg | string;
};

export type IEnterSheetInputForm = {
  consumerInput?: string[];
  cakeInput?: string[];
};

export type IStoreMenu = IEnterMenuInputForm & IEnterSheetInputForm;