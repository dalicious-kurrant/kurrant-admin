import {useState} from 'react';
import {useQuery} from 'react-query';
import instance from 'shared/axios';

const useReviewTableModal = (uniqueQueryKey, enable = true) => {
  const [reviewDetail, setReviewDetail] = useState(undefined);

  const {
    refetch: reviewDetailRefetch,
  } = useQuery(
    uniqueQueryKey,

    async ({queryKey}) => {
      if (queryKey[1]) {
        const response = await instance.get(`reviews?reviewId=${queryKey[1]}`);

        // 메이커스 목록

        setReviewDetail(response.data);

        return response.data;
      }
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {reviewDetail, reviewDetailRefetch};
};

export default useReviewTableModal;
