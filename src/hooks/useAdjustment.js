import {adjustApis} from 'api/adjustment';
import { useMutation, useQuery, useQueryClient} from 'react-query';

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
export function useGetOneMakersAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => adjustApis.addMakersAdjustment(data),
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
export function useGetOneSpotAdjust() {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => adjustApis.addSpotAdjustment(data),
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
export function useDeleteMakersAdjust() {
  const queryClient = useQueryClient();
  return useMutation(value => adjustApis.deleteAdjustMakers(value), {
    onSuccess: res => {
      queryClient.invalidateQueries('makersAdjustList');
    },
    onError: e => {
      alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
    },
  });
}
export function useDeleteSpotsAdjust() {
  const queryClient = useQueryClient();
  return useMutation(value => adjustApis.deleteAdjustSpots(value), {
    onSuccess: res => {
      queryClient.invalidateQueries('spotsAdjustList');
    },
    onError: e => {
      alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
    },
  });
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
export function useMakersAdjustList(
  startMonth,
  endMonth,
  selectClient,
  selectStatus,
  selectModify,
) {
  return useQuery('makersAdjustList', () => {
    return adjustApis.getAdjustMakersList(
      startMonth,
      endMonth,
      selectClient,
      selectStatus,
      selectModify,
    );
  });
}

export function useMakersAdjustListDetail(id) {
  return useQuery('makersAdjustListDetail', () => {
    return adjustApis.getAdjustMakersDetail(id);
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
export function useSpotsAdjustList(
  startMonth,
  endMonth,
  selectClient,
  selectStatus,
  selectModify,
) {
  return useQuery('spotsAdjustList', () => {
    return adjustApis.getAdjustSpotsList(
      startMonth,
      endMonth,
      selectClient,
      selectStatus,
      selectModify,
    );
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

export function useAddMakersIssue() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.addMakersIssue(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersAdjustListDetail');
    },
  });
}

export function useGetSpotOrders(id) {
  return useQuery('spotOrders', () => {
    return adjustApis.getSpotOrders(id);
  });
}

export function useGetSpotInvoice(id) {
  return useQuery('spotInvoice', () => {
    return adjustApis.getSpotInvoice(id);
  });
}

export function useAddSpotIssue() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.addSpotIssue(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('spotInvoice');
    },
  });
}

export function useAddMakersMemo() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.addMakersMemo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersAdjustListDetail');
    },
  });
}

export function useAddSpotMemo() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.addSpotMemo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('spotInvoice');
    },
  });
}
