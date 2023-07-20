import instance from 'shared/axios';

export const deliveryApi = {
  getDriverList: async (startDate, endDate) => await instance.get(`driver`),
  getDriverDelivery: async (startDate, endDate) =>
    await instance.get(
      `driver/schedules?startDate=${startDate}&endDate=${endDate}`,
    ),
  updateDriverDelivery: async data => await instance.post('driver/schedules', data),
  addDriver: async data => await instance.post('driver', data),
  deleteDriver: async data => await instance.delete('driver', {data: data}),
};
