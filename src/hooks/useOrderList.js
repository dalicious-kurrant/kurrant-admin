import {useMutation, useQuery, useQueryClient} from 'react-query';
import {orderApis} from '../api/order';

export function useGetGroupList() {
  return useQuery('groupList', () => {
    return orderApis.groupList();
  });
}

// export function useGetGroupInfoList(groupId) {
//   return useQuery('groupInfoList', () => {
//     return orderApis.groupInfoList(groupId);
//   });
// }

export function useGetOrderList(startDate, endDate, params) {
  return useQuery('orderList', () => {
    return orderApis.orderList(startDate, endDate, params);
  });
}

export function useGetMakersList() {
  return useQuery('makersList', () => {
    return orderApis.makersList();
  });
}

export function useGetOrderDetailList(orderCode) {
  return useQuery('orderDetailList', () => {
    return orderApis.orderDetail(orderCode);
  });
}

export function useCancelOrder() {
  return useMutation(data => {
    return orderApis.orderCancel(data);
  });
}

export function useAllUserList() {
  return useQuery('allUserList', () => {
    return orderApis.allUserList();
  });
}

export function useEditOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => orderApis.editOrderStatus(data), {
    onSuccess: () => {
      alert('상태변경 완료');
      queryClient.invalidateQueries('orderList');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}
