import {mySpotAdminApis} from 'api/mySpotAdmin';
import {useMutation, useQuery, useQueryClient} from 'react-query';

// 고객 > 스팟 정보 > 마이 스팟 존

// 조회
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

// 필터 정보 조회
export function useGetAdminFilterList(selectCity, selectCounty, selectVillage) {
  return useQuery('spotAdminFilter', () => {
    return mySpotAdminApis.filterData(selectCity, selectCounty, selectVillage);
  });
}

// 추가 하기 버튼

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

// 수정
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

// 삭제
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

// 일괄 상태 변경
export function useChangeStstusMySpotAdmin() {
  const queryClient = useQueryClient();
  return useMutation(data => mySpotAdminApis.changeStatusMySpotAdmin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('mySpotAdmin');
      queryClient.invalidateQueries('spotAdminFilter');
    },
    onError: err => {
      console.log(err);
    },
  });
}
