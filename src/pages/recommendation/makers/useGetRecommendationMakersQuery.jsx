import {useQuery, useQueryClient} from 'react-query';

import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';
import {getFoodGroupAtom, getGroupsAtom, getRecommendationAtom} from './store';

const useGetRecommendationMakersQuery = (enable = true) => {
  const [recommendationMakersData, setRecommendationMakersData] = useAtom(
    getRecommendationAtom,
  );

  const [groupsList, setGroupsList] = useAtom(getGroupsAtom);
  const [foodGroupList, setFoodGroupList] = useAtom(getFoodGroupAtom);

  const {refetch: getRecommendationMakersQueryRefetch} = useQuery(
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

  useQuery(
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
  useQuery(
    ['util', 'foodGroupList'],

    async ({queryKey}) => {
      const response = await instance.get('/foods/groups');

      setFoodGroupList(response.data);

      return response.data;
    },
    {
      enabled: enable,
      retry: 1,
      retryDelay: 800,
    },
  );

  useEffect(() => {
    console.log(foodGroupList);
  }, [foodGroupList]);

  return {
    getRecommendationMakersQueryRefetch,
    recommendationMakersData,
    groupsList,
  };
};
export default useGetRecommendationMakersQuery;
