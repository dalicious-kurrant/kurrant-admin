import {useQuery} from 'react-query';
import {salesApis} from '../api/sales';

export function useGetSalesList(startDate, endDate, diningSelect, makersId) {
  return useQuery('salesList', () => {
    if (makersId) {
      return salesApis.loadSalesList(
        startDate,
        endDate,
        diningSelect,
        makersId,
      );
    }
  });
}
