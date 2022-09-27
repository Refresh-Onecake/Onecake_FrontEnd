import {useMutation, useQuery} from 'react-query';
import {customAxios} from '../../../../api/customAxios';
import {queryKeys} from '../../../../enum';

export const getDayOff = async () => {
  const {data} = await customAxios().get<string[]>(
    '/api/v1/seller/store/dayOff',
  );
  return data;
};

export const useDayOffQuery = () => {
  return useQuery(queryKeys.DayOff, getDayOff, {
    onSuccess: data => {
      console.log(data);
    },
  });
};
