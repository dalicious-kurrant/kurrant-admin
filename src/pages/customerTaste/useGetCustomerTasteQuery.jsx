import {useQuery, useQueryClient} from 'react-query';

import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';
import {customerTasteFoodIdListAtom} from './store';

const useGetCustomerTasteQuery = (enable = true) => {
  const [customerTasteFoodIdList, setCustomerTasteFoodIdList] = useAtom(
    customerTasteFoodIdListAtom,
  );

  const {refetch: customerTasteFoodIdsQueryRefetch} = useQuery(
    ['others', 'customerTaste'],

    async ({queryKey}) => {
      const response = await instance.get('/users/test/data');

      // console.log(response.data);

      setCustomerTasteFoodIdList(response.data);

      // 메이커스 목록

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {
    customerTasteFoodIdList,
    customerTasteFoodIdsQueryRefetch,
  };
};
export default useGetCustomerTasteQuery;
