import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';

const useSpotInfoExelForceQuery = () => {
  const queryClient = useQueryClient();

  const {mutate: sendExcelForceMutate} = useMutation(
    async todo => {
      console.log(todo);

      const response = await instance.post(`clients`, todo);
      return response;
    },
    {
      onSuccess: () => {
        console.log('스팟정보 등록, 수정 success');
        window.confirm(' 스팟정보가 저장되었습니다 ');
        queryClient.invalidateQueries(['getSpotInfoJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  return {sendExcelForceMutate};
};

export default useSpotInfoExelForceQuery;
