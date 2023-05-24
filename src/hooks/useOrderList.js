import {useAtom} from 'jotai';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {diningListAtom, spotListAtom, userListAtom} from 'utils/store';
import {orderApis} from '../api/order';

export function useGetGroupList() {
  return useQuery('groupList', () => {
    return orderApis.groupList();
  });
}

export function useGetGroupInfoList(groupId) {
  const [spotList, setSpotList] = useAtom(spotListAtom);
  const [userList, setUserList] = useAtom(userListAtom);
  const [diningType, setDiningType] = useAtom(diningListAtom);
  return useQuery(
    'groupInfoList',
    () => {
      return orderApis.groupInfoList(groupId);
    },
    {
      onSuccess: res => {
        setUserList(res.data.users);
        setSpotList(res.data.spots);
        setDiningType(res.data.diningTypes);
      },
    },
  );
}

export function useGetOrderList(
  startDate,
  endDate,
  groupOption,
  userOption,
  spotOption,
  makersOption,
  diningTypeOption,
  orderStatusOption,
) {
  return useQuery('orderList', () => {
    return orderApis.orderList(
      startDate,
      endDate,
      groupOption,
      userOption,
      spotOption,
      makersOption,
      diningTypeOption,
      orderStatusOption,
    );
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
  return useMutation(data => orderApis.orderCancel(data), {
    onSuccess: res => {
      alert(res.message);
    },
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
