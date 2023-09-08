import instance from '../shared/axios';

export const orderApis = {
  groupList: async spotType => {
    const url = 'orders/group';
    const spot = `?spotType=${spotType}`;
    return await instance.get(spotType ? url + spot : url);
  },
  groupInfoList: async groupId =>
    await instance.get(`orders/groupInfo${groupId}`),
  makersList: async () => await instance.get('orders/makers'),
  groupAllList: async () => await instance.get('dailyFoods/groupsAndMakers'),
  orderList: async (
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
  ) => {
    const params = {
      group: groupOption !== '' ? groupOption : null,
      userId: userOption,
      spots: spotOption,
      spotType: groupTypeOption,
      makersId: makersOption,
      diningTypeCode: diningTypeOption,
      status: orderStatusOption,
    };
    if (checkFilterType === 0) {
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (checkFilterType === 1) {
      params.orderStartDate = startOrderDate;
      params.orderEndDate = endOrderDate;
    } else {
      params.startDate = startDate;
      params.endDate = endDate;
      params.orderStartDate = startOrderDate;
      params.orderEndDate = endOrderDate;
    }

    const res = await instance.get(`orders`, {
      params: params,
    });
    return res;
  },
  orderDetail: async orderCode => await instance.get(`orders/${orderCode}`),
  orderCancel: async data =>
    await instance.post('orders/orderItems/cancel', data),
  allUserList: async () => await instance.get('users'),
  allUserExport: async () => await instance.get('users/excel'),
  editOrderStatus: async data =>
    await instance.post('orders/orderItems/status', data),
};
