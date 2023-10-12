import {applyMakersApis} from 'api/applyMakers';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useApplyMakersList(page) {
  return useQuery('applyMakersList', () => {
    return applyMakersApis.makersList(page);
  });
}

export function useApplyMakers() {
  const queryClient = useQueryClient();
  return useMutation(data => applyMakersApis.applyMakers(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('applyMakersList');
    },
  });
}

export function useModifyStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => applyMakersApis.modifyStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('applyMakersList');
      alert('상태 변경 완료');
    },
  });
}

export function useDeleteApplyMakers() {
  const queryClient = useQueryClient();
  return useMutation(id => applyMakersApis.deleteApplyMakers(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('applyMakersList');
    },
  });
}
