import {IFetchMenu} from '../screens/enterMenu';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1NjUwMjAyM30.xBxUKj5h9iAJ8eA-n7eUq0bNHLpPI6F7GPByGkJzolTbUPClrsJx0RmDzFPUBO42hIoA3ZdZDPg7EzQudx8SHQ';

export type IMenuList = {
  image: string;
  menuName: string;
  menuDescription: string;
  price: number;
};

export const getMenuList = async () => {
  const response = await fetch(
    'http://15.165.27.120:8080/api/v1/seller/store/menu',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // if (!response.ok) {
  //   throw new Error(response.status.toString());
  // }
  return response;
};

export const fetchStoreEnterMenu = async (data: IFetchMenu) => {
  const response = await fetch(
    'http://15.165.27.120:8080/api/v1/seller/store/menu',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );
  return response.json();
};
