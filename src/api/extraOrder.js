const {default: instance} = require('shared/axios');

export const extraOrderApis = {
  extraFoodList: async (startDate, endDate) =>
    await instance.get(
      `orders/extra/dailyFoods?startDate=${startDate}&endDate=${endDate}`,
    ),
  extraOrderHistory: async (startDate, endDate) =>
    await instance.get(
      `orders/extra?startDate=${startDate}&endDate=${endDate}`,
    ),
  extraOrder: async data => await instance.post(`orders/extra`, data),
  extraOrderRefund: async id => await instance.post('orders/extra', id),
  detailSpotList: async id => await instance.get(`groups/${id}/spots`),
};
