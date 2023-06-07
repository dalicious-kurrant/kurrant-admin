import instance from 'shared/axios';

export const MySpotApis = {
  addMySpot: async data => await instance.post('my/zone/requests', data),
  loadMySpot: async (
    page,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
    minUser,
    maxUser,
  ) =>
    await instance.get(`my/zone/requests/all?limit=50&page=${page}`, {
      params: {
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
        zipcode: selectZipcode.length === 0 ? null : selectZipcode.join(','),
        min: minUser === '' ? null : minUser,
        max: maxUser === '' ? null : maxUser,
      },
    }),
  deleteMySpot: async data =>
    await instance.delete('my/zone/requests', {data: data}),
  modifyMySpot: async data => await instance.patch('my/zone/requests', data),
  filterData: async (selectCity, selectCounty, selectVillage) =>
    await instance.get('my/zone/requests/filter', {
      params: {
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
      },
    }),
  createSpot: async data =>
    await instance.post('my/zone/requests/create/zone', data),
};
