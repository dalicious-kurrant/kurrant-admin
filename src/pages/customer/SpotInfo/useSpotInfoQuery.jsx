import axios from 'axios';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import styled from 'styled-components';
import {SpotInfoDataAtom} from './store';

const useSpotInfoQuery = () => {
  const queryClient = useQueryClient();
  const [, setSpotInfoData] = useAtom(SpotInfoDataAtom);
  // 일단 instance해 놓음

  const {
    data: data,
    status,
    isLoading,
  } = useQuery(
    ['getSpotInfoJSON'],
    async ({queryKey}) => {
      // const response = await instance.get(
      //   `${process.env.REACT_APP_JSON_SERVER_SPOT_INFO}/spot-info`,
      //   // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      // );

      const response = await axios.get(
        `${process.env.REACT_APP_JSON_SERVER_SPOT_INFO}/spot-info`,
      );

      // console.log(response.data);
      return response.data;
    },
    {
      // enabled: false,
    },
  );

  useEffect(() => {
    setSpotInfoData(data);
  }, [data]);

  return {
    status,
    isLoading,
  };
};

export default useSpotInfoQuery;
