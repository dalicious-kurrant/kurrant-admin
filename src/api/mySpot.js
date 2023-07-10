import instance from 'shared/axios';

export const MySpotApis = {
  addMySpot: async data =>
    await instance.post('application-forms/spots/my', data),
  loadMySpot: async (
    page,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
    minUser,
    maxUser,
  ) =>
    await instance.get(`application-forms/spots/my?limit=50&page=${page}`, {
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
    await instance.delete('application-forms/spots/my', {data: data}),
  modifyMySpot: async data =>
    await instance.patch('application-forms/spots/my', data),
  filterData: async (selectCity, selectCounty, selectVillage) =>
    await instance.get('application-forms/spots/my/filter', {
      params: {
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
      },
    }),
  createSpot: async data =>
    await instance.post('application-forms/create/zone', data),
  renewSpot: async data =>
    await instance.post('application-forms/spots/my/renew', data),
  renewSpotLoad: async () =>
    await instance.get('application-forms/spots/my/renew'),
};
