import instance from '../shared/axios';

export const spotApis = {
  getSpot: async () => await instance.get('clients/spot/all'),
};
