import axios from 'axios';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import styled from 'styled-components';
import {CustomerDataAtom} from './store';

const useCustomerQuery = () => {
  const queryClient = useQueryClient();
  const [, setCustomerData] = useAtom(CustomerDataAtom);
  // 일단 instance해 놓음

  const {
    data: data,
    status,
    isLoading,
  } = useQuery(
    ['getCustomerJSON'],
    async ({queryKey}) => {
      // const response = await instance.get(
      //   `${process.env.REACT_APP_JSON_SERVER_SPOT_INFO}/spot-info`,
      //   // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      // );

      const response = await axios.get(
        `${process.env.REACT_APP_JSON_SERVER}/customer`,
      );

      // console.log(response.data);
      return response.data;
    },
    {
      // enabled: false,
    },
  );

  useEffect(() => {
    setCustomerData(data);
  }, [data]);

  return {
    status,
    isLoading,
  };
};

export default useCustomerQuery;
