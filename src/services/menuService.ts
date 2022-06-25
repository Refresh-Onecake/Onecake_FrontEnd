import {IFetchMenu} from '../screens/enterMenu';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1NjEzOTAyMX0.9r6pQGuWXcwcWXygJ2xx4qRsr2E9YEaoF6UgYo0jnS85txWwePJE479mKM-l36X3pZqM5ZuVQCrDUpyS0pdpCw';

export type IMenuList = {
  id: number;
  title: string;
  subTitle: string;
  price: number;
};

export const getMenuList = async () => {
  const response = await fetch('http://localhost:3000/menuListNot', {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
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
