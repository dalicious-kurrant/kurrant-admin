import instance from 'shared/axios';

export const successApi = {
  orderSuccess: async data =>
    await instance.post('/users/me/orders', {
      ...data,
    }),
};
