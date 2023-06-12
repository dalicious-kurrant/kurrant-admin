import {MySpotApis} from 'api/mySpot';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useAddMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.addMySpot(data), {
    onSuccess: res => {
      queryClient.invalidateQueries('mySpotZone');
      queryClient.invalidateQueries('spotFilter');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}

export function useGetMySpotList(
  page,
  selectCity,
  selectCounty,
  selectVillage,
  selectZipcode,
  minUser,
  maxUser,
) {
  return useQuery('mySpotZone', () => {
    return MySpotApis.loadMySpot(
      page,
      selectCity,
      selectCounty,
      selectVillage,
      selectZipcode,
      minUser,
      maxUser,
    );
  });
}

export function useGetFilterList(selectCity, selectCounty, selectVillage) {
  return useQuery('spotFilter', () => {
    return MySpotApis.filterData(selectCity, selectCounty, selectVillage);
  });
}

export function useDeleteMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.deleteMySpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotZone');
    },
    onError: err => {
      console.log(err);
    },
  });
}
export function useModifyMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.modifyMySpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotZone');
    },
    onError: err => {
      console.log(err);
    },
  });
}

export function useCreateMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.createSpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotZone');
      queryClient.invalidateQueries('spotFilter');
    },
    onError: err => {
      console.log(err);
    },
  });
}
