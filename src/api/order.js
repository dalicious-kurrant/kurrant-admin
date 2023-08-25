import instance from '../shared/axios';

export const orderApis = {
  groupList: async (spotType) => {
    const url = 'orders/group';
    const spot = `?spotType=${spotType}`
   return await instance.get(spotType ?url+spot :url)
  },
  groupInfoList: async groupId =>
    await instance.get(`orders/groupInfo${groupId}`),
  makersList: async () => await instance.get('orders/makers'),
  groupAllList: async () => await instance.get('dailyFoods/groupsAndMakers'),
  orderList: async (
    startDate,
    endDate,
    groupOption,
    userOption,
    spotOption,
    makersOption,
    diningTypeOption,
    orderStatusOption,
  ) =>
    await instance.get(`orders?startDate=${startDate}&endDate=${endDate}`, {
      params: {
        group: groupOption,
        userId: userOption,
        spots: spotOption,
        makersId: makersOption,
        diningTypeCode: diningTypeOption,
        status: orderStatusOption,
      },
    }),
  orderDetail: async orderCode => await instance.get(`orders/${orderCode}`),
  orderCancel: async data =>
    await instance.post('orders/orderItems/cancel', data),
  allUserList: async () => await instance.get('users'),
  editOrderStatus: async data =>
    await instance.post('orders/orderItems/status', data),
};
