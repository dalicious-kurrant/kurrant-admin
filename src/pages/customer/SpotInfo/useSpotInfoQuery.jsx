import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import styled from 'styled-components';

const useSpotInfoQuery = () => {
  const queryClient = useQueryClient();

  // 일단 instance해 놓음

  const {
    data: data_getSpotInfoJSON,
    status_getSpotInfoJSON,
    isLoading_getSpotInfoJSON,
  } = useQuery(
    ['getSpotInfoJSON'],
    async ({queryKey}) => {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      );

      return response.data;
    },
    {
      enabled: false,
    },
  );

  return {
    data_getSpotInfoJSON,
    status_getSpotInfoJSON,
    isLoading_getSpotInfoJSON,
  };
};

export default useSpotInfoQuery;
