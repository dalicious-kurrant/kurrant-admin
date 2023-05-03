const {default: instance} = require('shared/axios');

export const extraOrderApis = {
  extraFoodList: async (startDate, endDate, groupOption) =>
    await instance.get(
      `orders/extra/dailyFoods?startDate=${startDate}&endDate=${endDate}`,
      {
        params: {
          groupId: groupOption === undefined ? null : groupOption,
        },
      },
    ),
  extraOrderHistory: async (startDate, endDate, groupOption) =>
    await instance.get(
      `orders/extra?startDate=${startDate}&endDate=${endDate}`,
      {
        params: {
          groupId: groupOption === undefined ? null : groupOption,
        },
      },
    ),
  extraOrder: async data => await instance.post(`orders/extra`, data),
  extraOrderRefund: async id => await instance.post('orders/extra/refund', id),
  detailSpotList: async id => await instance.get(`groups/${id}/spots`),
};
