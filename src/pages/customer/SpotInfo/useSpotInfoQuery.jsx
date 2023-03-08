import axios from 'axios';
import {dataHasNoIdAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';

import {addGroupIdNameInSpotInfoFieldsData, makeId} from './SpotInfoLogics';
import {SpotInfoGroupIdNameAtom} from './store';

const useSpotInfoQuery = (
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

  const queryClient = useQueryClient();

  const [, setData] = useAtom(atom[0]);
  const [, setGroupIdNameData] = useAtom(SpotInfoGroupIdNameAtom);
  // const [, setExcelData] = useAtom(atom[1]);
  const [, setDataHasNoId] = useAtom(dataHasNoIdAtom);

  const {data, status, isLoading} = useQuery(
    uniqueQueryKey,

    token
      ? async ({queryKey}) => {
          const response = await instance.get(url);

          let dataInputWithId;

          if (Object.keys(response.data[0]).includes('id')) {
            dataInputWithId = response.data;
          } else {
            dataInputWithId = makeId(response.data);
            setDataHasNoId(true);
          }

          return dataInputWithId;
        }
      : async ({queryKey}) => {
          const response = await axios.get(url);

          let dataInputWithId;

          if (Object.keys(response.data[0]).includes('id')) {
            dataInputWithId = response.data;
          } else {
            dataInputWithId = makeId(response.data);
            setDataHasNoId(true);
          }

          return dataInputWithId;
        },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  useQuery(
    ['getSpotInfoGroupIdName'],
    async () => {
      const response = await instance.get('/clients/spots');

      setGroupIdNameData(addGroupIdNameInSpotInfoFieldsData(response.data));
      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  const {mutate: sendFinalMutate} = useMutation(
    async todo => {
      console.log(todo);

      const response = await instance.post(`clients`, todo);
      return response;
    },
    {
      onSuccess: () => {
        console.log('스팟정보 등록, 수정 success');

        queryClient.invalidateQueries(['getSpotInfoJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  const {mutate: deleteFinalMutate} = useMutation(
    async array => {
      const response = await instance.patch(`clients`, array);

      return response;
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries(['getSpotInfoJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  useEffect(() => {
    setData(data);
  }, [data]);

  return {
    status,
    isLoading,
    sendFinalMutate,
    deleteFinalMutate,
  };
};

export default useSpotInfoQuery;
