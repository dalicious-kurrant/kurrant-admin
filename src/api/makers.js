import instance from 'shared/axios';

export const makersApis = {
  makersInfo: async () => await instance.get('makers'),
  saveMakersInfo: async data => await instance.post('makers', data),
  updateMakersInfo: async data => await instance.patch('makers', data),
};
