import {makersApis} from 'api/makers';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetMakersInformation() {
  return useQuery('makersInformation', () => {
    return makersApis.makersInfo();
  });
}

export function useSaveMakersInformation() {
  const queryClient = useQueryClient();
  return useMutation(data => makersApis.saveMakersInfo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersInformation');
    },
    onError: err => {
      console.log(err, '메이커스에러');
      alert('잘못된 데이터가 입력됐습니다. 다시 시도해주세요');
    },
  });
}
export function useUpdateMakersDetail() {
  const queryClient = useQueryClient();
  return useMutation(data => makersApis.updateMakersInfo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersInformation');
    },
    onError: err => {
      console.log(err, '메이커스에러');
      alert('잘못된 데이터가 입력됐습니다. 다시 시도해주세요');
    },
  });
}
