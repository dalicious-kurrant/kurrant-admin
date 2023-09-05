import {calendarApis} from 'api/calendar';
import {useMutation, useQuery} from 'react-query';

export function usePostCalendar() {
  return useMutation(data => {
    return calendarApis.createDailyFood(data);
  });
}
export function useCompleteCalendar() {
  return useMutation(data => {
    console.log(data);
    return calendarApis.completeDailyFood(data);
  });
}
export function usePostCompleteCalendar() {
  return useMutation(
    data => {
      return calendarApis.completePostDailyFood(data);
    },
    {
      onError: err => alert(err.response.data.message),
    },
  );
}

export function useGetCompleteCalendar(
  startDate,
  endDate,
  size,
  page,
  makersId,
  groupId,
  shouldFetchData,
) {
  return useQuery(
    'calendarCompleteList',
    () => {
      return calendarApis.getCompleteDailyFood(
        startDate,
        endDate,
        size,
        page,
        makersId,
        groupId,
      );
    },
    {
      enabled: shouldFetchData,
    },
  );
}
export function useGetCalendar(size, page, makersId, groupId, status) {
  return useQuery('calendarList', () => {
    return calendarApis.getDailyFood(size, page, makersId, groupId, status);
  });
}
export function useGetExportCalendar() {
  return useQuery('calendarExportList', () => {
    return calendarApis.getExportDailyFood();
  });
}
export function useGetFilter() {
  return useQuery('filterList', () => {
    return calendarApis.getFilterList();
  });
}
export function useGetRecommandCalendar(
  startDate,
  endDate,
  size,
  page,
  makersId,
  groupId,
  status,
  isClick,
  setIsClick,
) {
  return useQuery(
    'calendarRecommandList',
    () => {
      return calendarApis.getRecommnadDailyFood(
        startDate,
        endDate,
        size,
        page,
        makersId,
        groupId,
        status,
      );
    },
    {
      enabled: isClick,
      retry: false,
      onSuccess: () => {
        setIsClick(false);
      },
    },
  );
}

export function usePostPresetCalendar() {
  return useMutation(data => {
    return calendarApis.presetDailyFood(data);
  });
}
