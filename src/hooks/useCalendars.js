import {calendarApis} from 'api/calendar';
import {useMutation, useQuery, useQueryClient} from 'react-query';

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
export function useUpdateFoodsStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => {
    return calendarApis.updateFoodsStatus(data);
  },{
    onSuccess:(res)=>{
      console.log(res)
      queryClient.invalidateQueries('calendarCompleteList')
    }
  });
}
export function usePostCompleteCalendar() {
  return useMutation(
    data => {
      console.log(data)
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
  diningType,
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
        diningType,
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
