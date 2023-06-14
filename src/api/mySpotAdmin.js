import instance from 'shared/axios';

export const mySpotAdminApis = {
  loadMySpotAdmin: async (
    page,
    selectName,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
    selectStatus,
  ) =>
    await instance.get(`groups/my/spot/zones?limit=50&size=${page}`, {
      params: {
        name: selectName.length === 0 ? null : selectName.join(','),
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
        zipcode: selectZipcode.length === 0 ? null : selectZipcode.join(','),
        status: selectStatus.length === 0 ? null : selectStatus.join(','),
      },
    }),
  filterData: async (selectCity, selectCounty, selectVillage) =>
    await instance.get('groups/my/spot/zones/filter', {
      params: {
        city: selectCity.length === 0 ? null : selectCity.join(','),
        county: selectCounty.length === 0 ? null : selectCounty.join(','),
        villages: selectVillage.length === 0 ? null : selectVillage.join(','),
      },
    }),

  addMySpotAdmin: async data => instance.post('groups/my/spot/zones', data),
  modifyMySpotAdmin: async data => instance.patch('groups/my/spot/zones', data),
  deleteMySpotAdmin: async data =>
    instance.patch('groups/my/spot/zones/delete', data),
  changeStatusMySpotAdmin: async data =>
    instance.patch('groups/my/spot/zones/status', data),
};
