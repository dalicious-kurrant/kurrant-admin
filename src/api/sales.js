import instance from '../shared/axios';

export const salesApis = {
  loadSalesList: async (startDate, endDate, diningSelect, makersId) =>
    await instance.get(
      `/orders/by/makers?startDate=${startDate}&endDate=${endDate}&diningTypes=${diningSelect}&makersId=${makersId}`,
    ),
};
