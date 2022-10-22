import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';
import {customAxios} from '../../../../api/customAxios';
import {queryKeys} from '../../../../enum';

export type ChartStatistics = {
  month: number;
  monthMinusOne: number;
  monthMinusTwo: number;
  monthMinusThree: number;
  monthMinusFour: number;
};

export const getChartStatistics = async (month: string) => {
  const {data} = await customAxios().get<ChartStatistics>(
    `/api/v1/seller/store/chart/statistics/${month}`,
  );
  return data;
};

export const useGetChartStatistics = (
  month: string,
  options?: UseQueryOptions<
    ChartStatistics,
    AxiosError,
    ChartStatistics,
    typeof queryKeys.ChartStatistics
  >,
) => {
  return useQuery(
    queryKeys.ChartStatistics,
    () => getChartStatistics(month),
    options,
  );
};
