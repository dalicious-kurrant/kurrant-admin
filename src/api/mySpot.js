import instance from 'shared/axios';

export const MySpotApis = {
  addMySpot: async data => await instance.post('my/zone/requests', data),
  loadMySpot: async (
    page,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
  ) =>
    await instance.get(`my/zone/requests/all?limit=50&page=${page}`, {
      params: {
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
        zipcode: selectZipcode.length === 0 ? null : selectZipcode.join(','),
      },
    }),
  deleteMySpot: async data =>
    await instance.delete('my/zone/requests', {data: data}),
  modifyMySpot: async data => await instance.patch('my/zone/requests', data),
  filterData: async () => await instance.get('my/zone/requests/filter'),
};
