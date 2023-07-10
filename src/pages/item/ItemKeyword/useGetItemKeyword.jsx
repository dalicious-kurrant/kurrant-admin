import {useState} from 'react';
import {useQuery} from 'react-query';
import instance from 'shared/axios';

const useGetItemKeyword = foodId => {
  const [keywordArr, setKeywordArr] = useState(undefined);

  // console.log('키워도 조회 푸드아이디 ' + foodId);

  const {refetch: reviewKeywordSearchQueryRefetch} = useQuery(
    ['review', 'keywordSearch', foodId],

    async ({queryKey}) => {
      const response = await instance.get(`reviews/keyword/${queryKey[2]}`);

      setKeywordArr(response.data);

      return response.data;
    },
    {
      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {
    reviewKeywordSearchQueryRefetch,

    keywordArr,
  };
};
export default useGetItemKeyword;
