import axios from 'axios';

export type ISignUp = {
  user_id: string;
  name: string;
  password: string;
  phone_number: string;
  member_type: string;
};

export type ISignUpRsp = {
  success: string;
  message: string;
};

export const apiClient = axios.create({
  baseURL: 'http://15.165.27.120:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

export const fetchSignUp = async ({
  user_id,
  name,
  password,
  phone_number,
  member_type,
}: ISignUp) => {
  const {data} = await apiClient.post<ISignUpRsp>('/api/v1/auth/signup', {
    user_id,
    name,
    password,
    phone_number,
    member_type,
  });

  return data;
};
