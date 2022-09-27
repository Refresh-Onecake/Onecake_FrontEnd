import axios, {AxiosResponse} from 'axios';
import {useMutation, useQueryClient} from 'react-query';
import {customAxios} from '../../../../api/customAxios';
import {queryKeys} from '../../../../enum';

type responseDayOff = {
  message: string;
  success: boolean;
};

export const fetchDayOff = async (dayOff: string[]) => {
  const {data} = await customAxios().post<responseDayOff>(
    '/api/v1/seller/store/dayOff',
    {
      dayOff,
    },
  );
  return data;
};

export const useDayOffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (dayOff: string[]) => await fetchDayOff(dayOff), {
    onSuccess: data => {
      queryClient.invalidateQueries(queryKeys.DayOff);
      console.log(data);
    },
  });
};
