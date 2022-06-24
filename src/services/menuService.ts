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
