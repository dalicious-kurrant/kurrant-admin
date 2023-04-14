import {useMutation, useQuery, useQueryClient} from 'react-query';
import {orderApis} from '../api/order';
import {notificationApis} from 'api/notification';

export function useGetManualNotificationType() {
  return useQuery('manual_notification_type', () => {
    return notificationApis.manualTypeInfo();
  });
}
export function useGetAutoNotificationType() {
  return useQuery('auto_notification_list', () => {
    return notificationApis.autoNotificationList();
  });
}
export function useGetManualNotificationSpot(type) {
  return useQuery('manual_notification_spot', () => {
    if (type) return notificationApis.manualSpotsInfo(type);
  });
}

export function usePostManualNotification() {
  const queryClient = useQueryClient();
  return useMutation(data => notificationApis.postManualNotification(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'manual_notification_spot',
        'manual_notification_type',
      ]);
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}
export function useUpdateAutoMessage() {
  const queryClient = useQueryClient();
  return useMutation(data => notificationApis.updateAutoMessage(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('auto_notification_list');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}
export function useUpdateAutoStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => notificationApis.updateAutoStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('auto_notification_list');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}
export function useUpdateAutoUrl() {
  const queryClient = useQueryClient();
  return useMutation(data => notificationApis.updateAutoUrl(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('auto_notification_list');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}
