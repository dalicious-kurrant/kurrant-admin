import axios from 'axios';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import {shiftUserType, sliceStringDataByKey} from './CustomerLogics';

const useCustomerQuery = (
  uniqueQueryKey,
  atom,
  url,
  token = false,
  enable = true,
) => {
  // 서버에서 데이터를 십플하게 받는 custom hook입니다
  // params : queryKey, atom, url, enable
  // queryKey : 배열 아니면 스트링
  // atom : jotai의 아톰
  // url : url
  // enable : useQuery를 껏다켰다 할 수 있음

  const [, setData] = useAtom(atom);
  const queryClient = useQueryClient();
  const {
    data,
    status,
    isLoading,
    refetch: userListRefetch,
  } = useQuery(
    uniqueQueryKey,

    token
      ? async ({queryKey}) => {
          const response = await instance.get(`${url}`);

          return response.data;
        }
      : async ({queryKey}) => {
          const response = await axios.get(url);

          return response.data;
        },
    {
      enabled: enable,
    },
  );

  const {mutate: sendFinalMutate} = useMutation(
    async todo => {
      console.log(todo);

      const response = await instance.post(`users`, todo);

      return response;
    },
    {
      onSuccess: () => {
        console.log('유저정보 등록, 수정 success');
        queryClient.invalidateQueries(['getCustomerJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );
  const {mutate: deleteFinalMutate} = useMutation(
    async todo => {
      console.log('sendDelete');
      console.log(todo);

      const response = await instance.patch(`users`, todo);

      return response;
    },
    {
      onSuccess: () => {
        console.log('유저정보 삭제 success');
        queryClient.invalidateQueries(['getCustomerJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  useEffect(() => {
    if (data) {
      // const dataYo = sliceStringDataByKey(shiftUserType(data), 'password', 5);
      const dataYo = shiftUserType(data);

      if (dataYo) {
        setData(dataYo);
      } else {
        setData([]);
      }
    }
  }, [data, setData]);

  useEffect(() => {
    userListRefetch();
  }, [url, userListRefetch]);
  return {
    status,
    isLoading,

    sendFinalMutate,
    deleteFinalMutate,
  };
};

export default useCustomerQuery;
