import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';

const useItemKeywordMutation = (handleCallback = () => {}) => {
  const queryClient = useQueryClient();

  const {mutate: addKeywordMutate} = useMutation(
    async data => {
      const response = await instance.post(`reviews/keyword`, data);

      return response;
    },
    {
      onSuccess: () => {
        // console.log('리뷰 신고 success');
        queryClient.invalidateQueries(['review', 'keywordSearch']);

        handleCallback();

        // window.confirm('리뷰 신고가 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        // window.confirm('리뷰 신고 실패');
      },
    },
  );

  return {addKeywordMutate};
};

export default useItemKeywordMutation;
