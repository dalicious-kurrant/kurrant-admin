import {calendarApis} from 'api/calendar';
import {useMutation, useQuery} from 'react-query';
import {scheduleFormatted} from 'utils/statusFormatter';

export function usePostCalendar() {
  return useMutation(data => {
    return calendarApis.createDailyFood(data);
  });
}

export function useGetCalendar(size, page, makersId, groupId, status) {
  return useQuery('calendarList', () => {
    return calendarApis.getDailyFood(size, page, makersId, groupId, status);
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
) {
  return useQuery('calendarRecommandList', () => {
    return calendarApis.getRecommnadDailyFood(
      startDate,
      endDate,
      size,
      page,
      makersId,
      groupId,
      status,
    );
  });
}

export function usePostPresetCalendar() {
  return useMutation(data => {
    return calendarApis.presetDailyFood(data);
  });
}
