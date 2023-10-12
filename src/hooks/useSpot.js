import {spotApis} from 'api/spot';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetSpotList() {
  return useQuery('allSpotList', () => {
    return spotApis.getSpot();
  });
}

// 공유 스팟
export function useGetShareSpotList(page) {
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

// 프라이빗

export function useGetPrivateSpotList(page) {
  return useQuery('privateSpotZone', () => {
    return spotApis.getPrivateSpot(page);
  });
}

export function useAddPrivateSpot() {
  const queryClient = useQueryClient();
  return useMutation(data => spotApis.addPrivateSpot(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('privateSpotZone');
    },
  });
}

export function useModifyPrivateStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => spotApis.modifyPrivateStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('privateSpotZone');
      alert('상태 변경 완료');
    },
  });
}

export function useDeletePrivateStatus() {
  const queryClient = useQueryClient();
  return useMutation(id => spotApis.deletePrivateSpot(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('privateSpotZone');
    },
  });
}
