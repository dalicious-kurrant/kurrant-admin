import instance from 'shared/axios';

export const makersApis = {
  makersInfo: async () => await instance.get('makers'),
};
