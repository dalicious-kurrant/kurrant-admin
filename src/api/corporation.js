import instance from 'shared/axios';

export const corporationApis = {
  corporationInfo: async (limit, page, name) =>
    await instance.get(`groups?limit=${limit}&page=${page}${name}`),
  corporationExportInfo: async () => await instance.get(`groups/excels`),
  corporationExel: async data => await instance.post('groups/excel', data),
  updateSpotDetail: async data =>
    await instance.patch('clients/spot/detail', data),
};
