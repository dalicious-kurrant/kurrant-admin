import instance from 'shared/axios';

export const adjustApis = {
  saveAdjustMakers: async (formData, config) =>
    await instance.post('paycheck/makers', formData, config),
  saveAdjustSpots: async (formData, config) =>
    await instance.post('paycheck/corporations', formData, config),
  updateAdjustMakers: async (formData, config) =>
    await instance.patch('paycheck/makers', formData, config),
  updateAdjustStatusMakers: async value =>
    await instance.put(`paycheck/makers/status/${value.id}`, value.status),
  deleteAdjustMakers: async value =>
    await instance.delete(`paycheck/makers/`, value),
  getAdjustMakersList: async (
    startMonth,
    endMonth,
    selectClient,
    selectStatus,
    selectModify,
  ) =>
    await instance.get(
      `paycheck/makers?startYearMonth=${startMonth}&endYearMonth=${endMonth}`,
      {
        params: {
          makersIds: selectClient.length === 0 ? null : selectClient.join(','),
          status: selectStatus === 99 ? null : selectStatus,
          hasRequest: selectModify === 99 ? null : selectModify,
        },
      },
    ),
  getAdjustMakersDetail: async id =>
    await instance.get(`paycheck/makers/${id}`),
  updateAdjustSpots: async (formData, config) =>
    await instance.patch('paycheck/corporations', formData, config),
  updateAdjustStatusSpots: async value =>
    await instance.put(
      `paycheck/corporations/status/${value.id}`,
      value.status,
    ),
  deleteAdjustSpots: async value =>
    await instance.delete(`paycheck/corporations`, value),
  getAdjustSpotsList: async (
    startMonth,
    endMonth,
    selectClient,
    selectStatus,
    selectModify,
  ) =>
    await instance.get(
      `paycheck/corporations?startYearMonth=${startMonth}&endYearMonth=${endMonth}`,
      {
        params: {
          makersIds: selectClient.length === 0 ? null : selectClient.join(','),
          status: selectStatus === 99 ? null : selectStatus,
          hasRequest: selectModify === 99 ? null : selectModify,
        },
      },
    ),
  getMakersList: async () => await instance.get('makersInfos'),
  getSpotsList: async () => await instance.get('corporationInfos'),
  addMakersIssue: async data =>
    await instance.post(`paycheck/makers/${data.id}/issues`, data.data),
  getSpotOrders: async id =>
    await instance.get(`paycheck/corporations/${id}/orders`),
  getSpotInvoice: async id =>
    await instance.get(`paycheck/corporations/${id}/invoice`),
};
