import axios from 'axios';
import {dataHasNoIdAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import {makeId} from './SpotInfoLogics';

const useSpotInfoData = (
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
  const [, setDataHasNoId] = useAtom(dataHasNoIdAtom);

  const {data, status, isLoading} = useQuery(
    uniqueQueryKey,

    token
      ? async ({queryKey}) => {
          const response = await instance.get(
            // `clients/spot/all`,
            url,
            // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
          );

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
    },
  );

  useEffect(() => {
    setData(data);
  }, [data]);

  return {
    status,
    isLoading,
  };
};

export default useSpotInfoData;
