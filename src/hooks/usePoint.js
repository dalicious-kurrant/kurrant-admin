import {pointApis} from 'api/point';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetPointPolicy() {
  return useQuery('pointPolicy', () => {
    return pointApis.pointPolicy();
  });
}

export function useGetEventPlicy() {
  return useQuery('eventPolicy', () => {
    return pointApis.eventPolicy();
  });
}

export function useAddEvent() {
  const queryClient = useQueryClient();
  return useMutation(data => pointApis.addEvent(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('eventPolicy');
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation(policyId => pointApis.deleteEvent(policyId), {
    onSuccess: () => {
      queryClient.invalidateQueries('eventPolicy');
    },
  });
}

export function useEditEvent() {
  const queryClient = useQueryClient();
  return useMutation(data => pointApis.editEvent(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('eventPolicy');
    },
  });
}

export function useUserPoint() {
  const queryClient = useQueryClient();
  return useMutation(data => pointApis.userPoint(data), {
    onSuccess: () => {
      //queryClient.invalidateQueries('eventPolicy');
    },
  });
}
