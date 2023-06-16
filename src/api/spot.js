import instance from '../shared/axios';

export const spotApis = {
  getSpot: async () => await instance.get('clients/spot/all'),
  getShareSpot : async(page)=> await instance.get(`application-forms/spots/share?limit=20&page=${page}`),
  addShareSpot : async(data)=>   await instance.post('application-forms/spots/share', data),
  deleteShareSpot: async data =>
  await instance.delete('application-forms/spots/share', {data: data}),
};