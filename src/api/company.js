import instance from 'shared/axios';

export const companyApis = {
  companyList: async () => await instance.get('orders/group'),
};
