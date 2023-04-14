import instance from 'shared/axios';

export const notificationApis = {
  manualTypeInfo: async () => await instance.get(`alarms/push/handle/type`),
  autoNotificationList: async () => await instance.get(`alarms/push/auto`),
  manualSpotsInfo: async type =>
    await instance.get(`alarms/push/handle?type=${type}`),
  postManualNotification: async data =>
    await instance.post(`alarms/push/handle`, data),
  updateAutoMessage: async data =>
    await instance.patch(`alarms/push/auto/message`, data),
  updateAutoStatus: async data =>
    await instance.patch(`alarms/push/auto/status`, data),
  updateAutoUrl: async data =>
    await instance.patch(`alarms/push/auto/url`, data),
};
