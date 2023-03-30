import {adjustApis} from 'api/adjustment';
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';

export function useSaveMakersAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (formData, config) => adjustApis.saveAdjustMakers(formData, config),
    {
      onSuccess: res => {
        queryClient.invalidateQueries('makersAdjustList');
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}
export function useSaveSpotsAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (formData, config) => adjustApis.saveAdjustSpots(formData, config),
    {
      onSuccess: res => {
        queryClient.invalidateQueries('spotsAdjustList');
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}

export function useUpdateMakersAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (formData, config) => adjustApis.updateAdjustMakers(formData, config),
    {
      onSuccess: res => {
        queryClient.invalidateQueries('makersAdjustList');
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}
export function useUpdateMakersAdjustStatus() {
  const queryClient = useQueryClient();
  return useMutation(value => adjustApis.updateAdjustStatusMakers(value), {
    onSuccess: res => {
      queryClient.invalidateQueries('makersAdjustList');
    },
    onError: e => {
      alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
    },
  });
}
export function useMakersAdjustList() {
  return useQuery('makersAdjustList', () => {
    return adjustApis.getAdjustMakersList();
  });
}
export function useUpdateSpotsAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (formData, config) => adjustApis.updateAdjustSpots(formData, config),
    {
      onSuccess: res => {
        queryClient.invalidateQueries('spotsAdjustList');
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}
export function useUpdateSpotsAdjustStatus() {
  const queryClient = useQueryClient();
  return useMutation(value => adjustApis.updateAdjustStatusSpots(value), {
    onSuccess: res => {
      queryClient.invalidateQueries('spotsAdjustList');
    },
    onError: e => {
      alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
    },
  });
}
export function useSpotsAdjustList() {
  return useQuery('spotsAdjustList', () => {
    return adjustApis.getAdjustSpotsList();
  });
}
export function useMakersList() {
  return useQuery('makersList', () => {
    return adjustApis.getMakersList();
  });
}
export function useSpotsList() {
  return useQuery('spotsList', () => {
    return adjustApis.getSpotsList();
  });
}
