import {mySpotAdminApis} from 'api/mySpotAdmin';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useLoadMySpotAdmin(
  page,
  selectName,
  selectCity,
  selectCounty,
  selectVillage,
  selectZipcode,
  selectStatus,
) {
  return useQuery('mySpotAdmin', () => {
    return mySpotAdminApis.loadMySpotAdmin(
      page,
      selectName,
      selectCity,
      selectCounty,
      selectVillage,
      selectZipcode,
      selectStatus,
    );
  });
}

export function useGetAdminFilterList(selectCity, selectCounty, selectVillage) {
  return useQuery('spotAdminFilter', () => {
    return mySpotAdminApis.filterData(selectCity, selectCounty, selectVillage);
  });
}

export function useCreateMySpotAdmin() {
  const queryClient = useQueryClient();
  return useMutation(data => mySpotAdminApis.addMySpotAdmin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotAdmin');
      queryClient.invalidateQueries('spotAdminFilter');
    },
    onError: err => {
      console.log(err);
    },
  });
}
export function useModifyMySpotAdmin() {
  const queryClient = useQueryClient();
  return useMutation(data => mySpotAdminApis.modifyMySpotAdmin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotAdmin');
      queryClient.invalidateQueries('spotAdminFilter');
    },
    onError: err => {
      console.log(err);
    },
  });
}

export function useDeleteMySpotAdmin() {
  const queryClient = useQueryClient();
  return useMutation(data => mySpotAdminApis.deleteMySpotAdmin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotAdmin');
      queryClient.invalidateQueries('spotAdminFilter');
    },
    onError: err => {
      console.log(err);
    },
  });
}
