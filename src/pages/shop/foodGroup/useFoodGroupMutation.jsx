import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';

const useFoodGroupMutation = setModalOpen => {
  const queryClient = useQueryClient();
  // 상품 추천 생성
  const {mutate: createFoodGroupMutation} = useMutation(
    async data => {
      console.log('데이터 ');
      console.log(data);
      console.log(data.foodType);

      const response = await instance.post(`foods/groups`, data);
      return response;
    },
    {
      onSuccess: () => {
        console.log('상품 추천 생성 success');

        queryClient.invalidateQueries(['foods', 'groups']);

        window.confirm('상품 추천 추가가 정상적으로 이루워졌습니다');

        setModalOpen(false);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('상품 추천 추가 실패 ');
      },
    },
  );

  // 상품 추천 수정
  const {mutate: editFoodGroupMutation} = useMutation(
    async data => {
      console.log('데이터 ');
      console.log(data);

      const response = await instance.post(`foods/groups`, data);
      return response;
    },
    {
      onSuccess: () => {
        console.log('상품 추천 수정 success');

        queryClient.invalidateQueries(['foods', 'groups']);

        window.confirm('상품 추천 수정이 정상적으로 이루워졌습니다');

        setModalOpen(false);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('상품 추천 수정 실패 ');
      },
    },
  );

  // 상품 그룹 삭제
  const {mutate: deleteFoodGroupMutation} = useMutation(
    async data => {
      console.log('데이터 삭제');
      console.log(data);

      const response = await instance.delete(`foods/groups`, data);
      return response;
    },
    {
      onSuccess: () => {
        console.log('상품 추천 삭제 success');

        queryClient.invalidateQueries(['foods', 'groups']);

        window.confirm('상품 추천 삭제가 정상적으로 이루워졌습니다');

        setModalOpen(false);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('상품 추천 삭제 실패 ');
      },
    },
  );

  return {
    editFoodGroupMutation,
    createFoodGroupMutation,
    deleteFoodGroupMutation,
  };
};
export default useFoodGroupMutation;
