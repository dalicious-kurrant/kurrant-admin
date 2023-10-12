import {recommendMakersApis} from 'api/recommendMakers';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetRecommendMakersName() {
  return useQuery('recommendNameList', () => {
    return recommendMakersApis.getMakers();
  });
}

export function useGetRecommendMakersList(
  page,
  selectStatus,
  selectMakers,
  selectSpots,
) {
  return useQuery('recommendList', () => {
    return recommendMakersApis.getRecommendMakersList(
      page,
      selectStatus,
      selectMakers,
      selectSpots,
    );
  });
}

export function useModifyRecommendStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => recommendMakersApis.modifyStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('recommendList');
      alert('상태변경 완료');
    },
  });
}
