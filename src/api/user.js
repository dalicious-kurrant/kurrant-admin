import instance from '../shared/axios';

export const usersApis = {
  userPostData: async data => await instance.post('users', data),
  userGetPublicData: async data => await instance.get('users'),
};
