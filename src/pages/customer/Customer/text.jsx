import {useQuery} from 'react-query';
import instance from 'shared/axios';
import styled from 'styled-components';

const useText = () => {
  const {data, status, isLoading} = useQuery(async ({queryKey}) => {
    const response = await instance.get(
      `clients/spot/all`,
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
    );
    console.log(response.data);
    return response.data;
  });

  return {};
};

export default useText;
