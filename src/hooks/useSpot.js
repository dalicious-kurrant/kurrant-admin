import {spotApis} from 'api/spot';
import {useQuery} from 'react-query';

export function useGetSpotList() {
  return useQuery('allSpotList', () => {
    return spotApis.getSpot();
  });
}
