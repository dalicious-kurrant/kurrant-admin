import {useQuery, useQueryClient} from 'react-query';
import {MakersListAtom, ReviewListAtom} from './store';
import {useAtom} from 'jotai';
import instance from 'shared/axios';

const useReviewQuery = (uniqueQueryKey, url, enable = true) => {
  const [reviewList, setReviewList] = useAtom(ReviewListAtom);
  const [makersList, setMakersList] = useAtom(MakersListAtom);

  const queryClient = useQueryClient();
  const {
    data,
    status,
    isLoading,
    refetch: reviewQueryRefetch,
  } = useQuery(
    uniqueQueryKey,

    async ({queryKey}) => {
      const response = await instance.get(url);

      // 메이커스 목록
      console.log(response);

      setMakersList(response.data.items.makersInfoList);
      // 리뷰 리스트 목록
      setReviewList(response.data.items.reviewList);

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {reviewQueryRefetch, status, isLoading, makersList, reviewList};
};
export default useReviewQuery;
