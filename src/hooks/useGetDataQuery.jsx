import axios from 'axios';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';

const useDataGetQuery = (uniqueQueryKey, atom, url, enable = true) => {
  // 서버에서 데이터를 십플하게 받는 custom hook입니다
  // params : queryKey, atom, url, enable
  // queryKey : 배열 아니면 스트링
  // atom : jotai의 아톰
  // url : url
  // enable : useQuery를 껏다켰다 할 수 있음

  const [, setData] = useAtom(atom);

  const {data, status, isLoading} = useQuery(
    uniqueQueryKey,
    async ({queryKey}) => {
      // const response = await instance.get(
      //   `${process.env.REACT_APP_JSON_SERVER_SPOT_INFO}/spot-info`,
      //   // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      // );

      const response = await axios.get(url);
      return response.data;
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

export default useDataGetQuery;
