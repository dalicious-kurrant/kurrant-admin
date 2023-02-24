import axios from 'axios';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import styled from 'styled-components';
import {CustomerDataAtom} from './store';

const PaginationTest = (page, limit) => {
  const [, setData] = useAtom(CustomerDataAtom);
  const queryClient = useQueryClient();

  console.log(`page ` + page);
  console.log(`limit ` + limit);

  const {data, status, isLoading} = useQuery(
    ['getMe', page, limit],
    async ({queryKey}) => {
      const response = await axios.get(
        `http://localhost:3010/customer?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      );

      return response.data;
    },
    {
      onSuccess: () => {
        console.log('success');
        // queryClient.invalidateQueries(['getMe']);
      },
      enabled: true,
    },
  );

  useEffect(() => {
    console.log(data);
    setData(data);
  }, [data]);

  return {};
};

export default PaginationTest;
