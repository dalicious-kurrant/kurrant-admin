import instance from 'shared/axios';

export const corporationApis = {
  corporationInfo: async (limit, page, name) =>
    await instance.get(`groups?limit=${limit}&page=${page}${name}`),
  corporationExel: async data => await instance.post('groups/excel', data),
};
