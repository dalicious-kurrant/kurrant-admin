import {extraOrderApis} from 'api/extraOrder';
import useMutate from 'common/CRUD/useMutate';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetExtraHistory(startDate, endDate, groupOption) {
  return useQuery('extraOrderHistory', () => {
    return extraOrderApis.extraOrderHistory(startDate, endDate, groupOption);
  });
}

export function useGetExtraFoodList(startDate, endDate, groupOption) {
  return useQuery('extraFoodList', () => {
    return extraOrderApis.extraFoodList(startDate, endDate, groupOption);
  });
}

export function useRefundExtraOrder() {
  const queryClient = useQueryClient();
  return useMutation(id => extraOrderApis.extraOrderRefund(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('extraOrderHistory');
      queryClient.invalidateQueries('extraFoodList');
    },
  });
}

export function useExtraOrder() {
  const queryClient = useQueryClient();
  return useMutation(data => extraOrderApis.extraOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('extraOrderHistory');
      queryClient.invalidateQueries('extraFoodList');
    },
  });
}

export function useGetDetailSpotList(id) {
  return useQuery('spotList', () => {
    if (id !== undefined) {
      return extraOrderApis.detailSpotList(id);
    }
  });
}
