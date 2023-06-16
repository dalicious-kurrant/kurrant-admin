import {spotApis} from 'api/spot';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetSpotList() {
  return useQuery('allSpotList', () => {
    return spotApis.getSpot();
  });
}
export function useGetShareSpotList(
  page,
) {
  return useQuery('shareSpotZone', () => {
    return spotApis.getShareSpot(page);
  });
}

export function useAddShareSpot() {
  const queryClient = useQueryClient();
  return useMutation(data => spotApis.addShareSpot(data), {
    onSuccess: res => {
      queryClient.invalidateQueries('shareSpotZone');
    },
    onError: err => {
      alert(err.response.data.message);
    },
  });
}

export function useDeleteShareSpot() {
  const queryClient = useQueryClient();
  return useMutation(data => spotApis.deleteShareSpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('shareSpotZone');
    },
    onError: err => {
      console.log(err);
    },
  });
}