import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';

const useCustomerTasteMutation = (handleCallback = () => {}) => {
  const queryClient = useQueryClient();

  const {mutate: editCustomerTasteData} = useMutation(
    async data => {
      console.log(data);
      const response = await instance.post(`users/test/data`, data);

      return response;
    },
    {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries(['others', 'customerTaste']);

        handleCallback();

        window.confirm(
          '식사 취향 테스트 데이터 등록하기가 정상적으로 이루워졌습니다',
        );
        // window.confirm('리뷰 신고가 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log(
          'edit CustomerTasteData 이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요',
        );
        console.log(err);
        window.confirm('식사 취향 테스트 데이터 등록하기 실패');
      },
    },
  );

  return {editCustomerTasteData};
};

export default useCustomerTasteMutation;
