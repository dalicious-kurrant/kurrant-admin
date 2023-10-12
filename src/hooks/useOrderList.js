import {useAtom} from 'jotai';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {diningListAtom, spotListAtom} from 'utils/store';
import {orderApis} from '../api/order';
import {userExel} from 'utils/downloadExel/exel';

export function useGetGroupList(spotType) {
  return useQuery('groupList', () => {
    return orderApis.groupList(spotType);
  });
}

export function useGetGroupInfoList(groupId) {
  const [, setSpotList] = useAtom(spotListAtom);
  // const [userList, setUserList] = useAtom(userListAtom);
  const [, setDiningType] = useAtom(diningListAtom);
  return useQuery(
    'groupInfoList',
    () => {
      return orderApis.groupInfoList(groupId);
    },
    {
      onSuccess: res => {
        // setUserList(res.data.users);
        setSpotList(res.data.spots);
        setDiningType(res.data.diningTypes);
      },
      retry: false,
      enabled: groupId !== 0,
    },
  );
}

export function useGetOrderList(
  startDate,
  endDate,
  groupOption,
  groupTypeOption,
  userOption,
  spotOption,
  makersOption,
  diningTypeOption,
  orderStatusOption,
  startOrderDate,
  endOrderDate,
  checkFilterType,
) {
  return useQuery(
    'orderList',
    () => {
      return orderApis.orderList(
        startDate,
        endDate,
        groupOption,
        groupTypeOption,
        userOption,
        spotOption,
        makersOption,
        diningTypeOption,
        orderStatusOption,
        startOrderDate,
        endOrderDate,
        checkFilterType,
      );
    },
    {
      retry: false,
      //enabled: false,
    },
  );
}

export function useGetMakersList() {
  return useQuery('makersList', () => {
    return orderApis.makersList();
  });
}
export function useGetGroupAllList() {
  return useQuery('groupAllList', () => {
    return orderApis.groupAllList();
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
export function useAllUserExport() {
  return useQuery(
    'allUserExport',
    () => {
      return orderApis.allUserExport();
    },
    {
      onSuccess: v => {
        console.log(v);
        userExel(v.data);
      },
      enabled: false,
    },
  );
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
