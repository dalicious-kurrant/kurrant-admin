import {calendarApis} from 'api/calendar';
import {useMutation, useQuery} from 'react-query';
import {scheduleFormatted} from 'utils/statusFormatter';

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

export function useGetCompleteCalendar(
  startDate,
  endDate,
  size,
  page,
  makersId,
  groupId,
) {
  return useQuery('calendarCompleteList', () => {
    return calendarApis.getCompleteDailyFood(
      startDate,
      endDate,
      size,
      page,
      makersId,
      groupId,
    );
  });
}
export function useGetCalendar(size, page, makersId, groupId, status) {
  return useQuery('calendarList', () => {
    return calendarApis.getDailyFood(size, page, makersId, groupId, status);
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
