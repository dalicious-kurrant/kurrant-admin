import {MySpotApis} from 'api/mySpot';
import {useMutation, useQuery, useQueryClient} from 'react-query';

// 추가
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

// 조회
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

// 필터 정보 조회
export function useGetFilterList(selectCity, selectCounty, selectVillage) {
  return useQuery('spotFilter', () => {
    return MySpotApis.filterData(selectCity, selectCounty, selectVillage);
  });
}

// 삭제
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

// 수정
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

// 스팟 개설
export function useCreateMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.createSpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotZone');
      queryClient.invalidateQueries('spotFilter');
      queryClient.invalidateQueries('renewData');
    },
    onError: err => {
      console.log(err);
    },
  });
}

// 스팟 갱신 조회

export function useRenewMySpot() {
  return useQuery('renewData', () => {
    return MySpotApis.renewSpotLoad();
  });
}

// 스팟 갱신

export function useRenew() {
  const queryClient = useQueryClient();
  return useMutation(data => MySpotApis.renewSpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('renewData');
      queryClient.invalidateQueries('mySpotZone');
      queryClient.invalidateQueries('spotFilter');
    },
  });
}
