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
