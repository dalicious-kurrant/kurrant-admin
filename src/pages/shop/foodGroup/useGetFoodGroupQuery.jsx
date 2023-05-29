import {useQuery, useQueryClient} from 'react-query';

import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';
import {getFoodGroupAtom, getMakersAtom} from './store';

const useGetFoodGroupQuery = (enable = true) => {
  const [foodGroupData, setFoodGroupData] = useAtom(getFoodGroupAtom);

  const [makersList, setMakersList] = useAtom(getMakersAtom);

  const {
    data,
    status,
    isLoading,
    refetch: getFoodGroupQueryRefetch,
  } = useQuery(
    ['foods', 'group'],

    async ({queryKey}) => {
      const response = await instance.get('/foods/groups');

      setFoodGroupData(response.data);

      // 메이커스 목록

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  const {refetch: getMakersListRefetchQuery} = useQuery(
    ['util', 'makersList'],

    async ({queryKey}) => {
      const response = await instance.get('/makersInfos');

      setMakersList(response.data);

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {
    getFoodGroupQueryRefetch,
    foodGroupData,
    makersList,
  };
};
export default useGetFoodGroupQuery;
