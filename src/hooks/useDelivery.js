import {deliveryApi} from 'api/delivery';
import {makersApis} from 'api/makers';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetDriver() {
  return useQuery('driver', () => {
    return deliveryApi.getDriverList();
  });
}
export function useGetDriverDelivery(startDate,endDate) {
  return useQuery('driverdelivery', () => {
    return deliveryApi.getDriverDelivery(startDate,endDate);
  },{
    enabled:false
  });
}

export function useUpdateDriverDelivery() {
  const queryClient = useQueryClient();
  return useMutation(data => deliveryApi.updateDriverDelivery(data), {
    onSuccess: () => {
      console.log("test")
      queryClient.invalidateQueries('driverdelivery');
    },
    onError: err => {
      throw new Error(err);
    },
  });
}
export function useAddDriver() {
  const queryClient = useQueryClient();
  return useMutation(data => deliveryApi.addDriver(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('driver');
    },
    onError: err => {
      throw new Error(err);
    },
  });
}
export function useDeleteDirver() {
  const queryClient = useQueryClient();
  return useMutation(data => deliveryApi.deleteDriver(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('driver');
    },
    onError: err => {
      throw new Error(err);
    },
  });
}
