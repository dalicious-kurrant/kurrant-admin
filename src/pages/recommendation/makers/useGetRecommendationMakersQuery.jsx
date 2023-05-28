import {useQuery, useQueryClient} from 'react-query';

import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';
import {getRecommendationAtom} from './store';

const useGetRecommendationMakersQuery = (
  uniqueQueryKey,
  url,
  enable = true,
) => {
  const [recommendationMakersData, setRecommendationMakersData] = useAtom(
    getRecommendationAtom,
  );

  const [groupsList, setGroupsList] = useState([]);

  const {
    data,
    status,
    isLoading,
    refetch: getRecommendationMakersQueryRefetch,
  } = useQuery(
    ['recommendation', 'makers'],

    async ({queryKey}) => {
      const response = await instance.get('/foods/recommends');

      setRecommendationMakersData(response.data);

      // 메이커스 목록

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  const {refetch: getGroupsListRefetchQuery} = useQuery(
    ['util', 'groupsList'],

    async ({queryKey}) => {
      const response = await instance.get('/orders/group');

      setGroupsList(response.data);

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {
    getRecommendationMakersQueryRefetch,
    recommendationMakersData,
    groupsList,
  };
};
export default useGetRecommendationMakersQuery;
