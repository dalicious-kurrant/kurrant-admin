import {useQuery, useQueryClient} from 'react-query';
import {MakersListAtom, ReviewListAtom, UnansweredCountAtom} from './store';
import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';

const useReviewQuery = (uniqueQueryKey, url, enable = true) => {
  const [reviewList, setReviewList] = useAtom(ReviewListAtom);
  const [makersList, setMakersList] = useAtom(MakersListAtom);
  const [unansweredCount, setUnansweredCount] = useAtom(UnansweredCountAtom);
  const [totalPage, setTotalPage] = useState(0);

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

      setMakersList(response.data.items.makersInfoList);
      // 리뷰 리스트 목록
      setReviewList(response.data.items.reviewList);
      // 미답변 갯수
      setUnansweredCount(response.data.items.unansweredCount);
      setTotalPage(response.data.total);
      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  // 타이핑을 했는데 가끔 검색이 안될때가 있다 그럴때 다시 보내게 하기

  // 1번만

  return {
    reviewQueryRefetch,
    unansweredCount,
    status,
    isLoading,
    makersList,
    reviewList,
    totalPage,
  };
};
export default useReviewQuery;
