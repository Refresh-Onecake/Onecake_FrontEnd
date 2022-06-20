export type IEnterStoreInputForm = {
  storeName: string;
  b_no: string;
  storeAddress: string;
  storePhoneNumber: string;
  storeDesc: string;
  storeUrl: string;
};

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
