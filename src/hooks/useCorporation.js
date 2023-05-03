import {corporationApis} from '../api/corporation';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetCorporationInfoDetail(spotId) {
  return useQuery('corporationInfoDetail', () => {
    return corporationApis.corporationInfoDetail(spotId);
  },{
    enabled:false
  });
}
export function useGetCorporationInfo(limit, page, name) {
  return useQuery('corporationInfoList', () => {
    return corporationApis.corporationInfo(limit, page, name);
  });
}
export function useGetExportCorporationInfo() {
  return useQuery('corporationExportInfoList', () => {
    return corporationApis.corporationExportInfo();
  });
}

export function useSaveExelCorporation() {
  return useMutation(data => {
    return corporationApis.corporationExel(data);
  });
}
export function useUpdateSpotDetail() {
  const queryClient = useQueryClient();
  return useMutation(
    data => {
      return corporationApis.updateSpotDetail(data);
    },
    {
      onSuccess: res => {
        queryClient.invalidateQueries(['corporationInfoList','corporationInfoDetail']);
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}
