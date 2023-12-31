import {useQuery} from 'react-query';

import {useAtom} from 'jotai';
import instance from 'shared/axios';
import {useEffect, useState} from 'react';
import {getFoodGroupAtom, getMakersAtom} from './store';

const useGetFoodGroupQuery = makersId => {
  const [foodGroupData, setFoodGroupData] = useAtom(getFoodGroupAtom);

  const [makersList, setMakersList] = useAtom(getMakersAtom);

  const {
    refetch: getFoodGroupQueryRefetch,
  } = useQuery(
    ['foods', 'groups'],

    async () => {
      const response = await instance.get('/foods/groups');

      setFoodGroupData(response.data);

      // 메이커스 목록

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  useQuery(
    ['util', 'makersList'],

    async () => {
      const response = await instance.get('/makersInfos');

      setMakersList(response.data);

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    }
  );

  const [foodGroupList, setFoodGroupList] = useState([]);

  const {refetch: getFoodGroupListRefetchQuery} = useQuery(
    ['util', 'foodGroupList'],

    async () => {
      const response = await instance.get(`/foods/makers/${makersId}/groups`);

      setFoodGroupList(response.data);

      return response.data;
    },
    {
      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  useEffect(() => {
    if (makersId) {
      getFoodGroupListRefetchQuery();
    }
  }, [getFoodGroupListRefetchQuery, makersId]);

  return {
    getFoodGroupQueryRefetch,
    foodGroupData,
    makersList,
    foodGroupList,
  };
};
export default useGetFoodGroupQuery;
