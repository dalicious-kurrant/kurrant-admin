import {calendarApis} from 'api/calendar';
import {useMutation, useQuery} from 'react-query';
import {scheduleFormatted} from 'utils/statusFormatter';

export function usePostCalendar() {
  return useMutation(data => {
    return calendarApis.createDailyFood(data);
  });
}

export function useGetCalendar(size, page) {
  return useQuery('calendarList', () => {
    return calendarApis.getDailyFood(size, page);
  });
}
