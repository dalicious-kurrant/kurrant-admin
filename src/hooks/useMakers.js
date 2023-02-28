import {makersApis} from 'api/makers';
import {useQuery} from 'react-query';

export function useGetMakersInfomation() {
  return useQuery('makersInfomation', () => {
    return makersApis.makersInfo();
  });
}
