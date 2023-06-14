import instance from 'shared/axios';

export const corporationApis = {
  corporationInfo: async (limit, page, name) =>
    await instance.get(`groups?limit=${limit}&page=${page}${name}`),
    corporationInfoDetail: async (spotId) =>
    await instance.get(`groups/detail?groupId=${spotId}`),
  corporationExportInfo: async () => await instance.get(`groups/excels`),
  corporationExel: async data => await instance.post('groups/excel', data),
  updateSpotDetail: async data =>
    await instance.patch('groups/detail', data),
};
