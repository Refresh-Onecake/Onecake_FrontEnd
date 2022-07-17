export interface IEnterStoreInputForm {
  store_name: string;
  business_registration_number: string;
  store_phone_number: string;
  store_discription: string;
  kakao_channel_url: string;
}

export type IStoreImg = {
  name: string | undefined;
  type: string | undefined;
  uri: string | undefined;
};

export type IAddress = {
  jibun_address: string;
  road_full_addr: string;
  si_nm: string;
  sgg_nm: string;
  emd_nm: string;
  lnbr_mnnm: string;
  address_detail: string;
};

export type IFetchEnterStore = {
  store_name: string;
  business_registration_number: string;
  store_phone_number: string;
  store_discription: string;
  kakao_channel_url: string;
  address: IAddress;
  store_image: string;
  open_time: string;
  close_time: string;
};
