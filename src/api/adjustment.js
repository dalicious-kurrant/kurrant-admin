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
  getAdjustMakersList: async () => await instance.get('paycheck/makers'),
  updateAdjustSpots: async (formData, config) =>
    await instance.patch('paycheck/corporations', formData, config),
  updateAdjustStatusSpots: async value =>
    await instance.put(
      `paycheck/corporations/status/${value.id}`,
      value.status,
    ),
  deleteAdjustSpots: async value =>
    await instance.delete(`paycheck/corporations`, value),
  getAdjustSpotsList: async () => await instance.get('paycheck/corporations'),
  getMakersList: async () => await instance.get('makersInfos'),
  getSpotsList: async () => await instance.get('corporationInfos'),
};
