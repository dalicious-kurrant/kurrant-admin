import instance from '../shared/axios';

export const orderApis = {
  groupList: async () => await instance.get('orders/group'),
  groupInfoList: async groupId =>
    await instance.get(`orders/groupInfo${groupId}`),
  makersList: async () => await instance.get('orders/makers'),
  orderList: async (startDate, endDate, params) =>
    await instance.get(
      `orders?startDate=${startDate}&endDate=${endDate}${params.group}${params.spots}${params.makers}${params.type}${params.user}${params.order}`,
    ),
  orderDetail: async orderCode => await instance.get(`orders/${orderCode}`),
  orderCancel: async data =>
    await instance.post('orders/orderItems/cancel', data),
  allUserList: async () => await instance.get('orders/groupInfo'),
  editOrderStatus: async data =>
    await instance.post('orders/orderItems/status', data),
};
