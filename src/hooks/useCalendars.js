import {calendarApis} from 'api/calendar';
import {useMutation} from 'react-query';
import {scheduleFormatted} from 'utils/statusFormatter';

export function usePostCalendar() {
  return useMutation(data => {
    console.log(data);
    return calendarApis.createDailyFood(data);
  });
}
