import {corporationApis} from '../api/corporation';
import {useMutation, useQuery} from 'react-query';

export function useGetCorporationInfo(limit, page, name) {
  return useQuery('corporationInfoList', () => {
    return corporationApis.corporationInfo(limit, page, name);
  });
}

export function useSaveExelCorporation() {
  return useMutation(data => {
    return corporationApis.corporationExel(data);
  });
}
