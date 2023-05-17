import { logApis } from "api/backlog";
import { useQuery } from "react-query";


export function useBackLog(limit,page,logType,controllerType,startDate,endDate) {
  return useQuery('backlog', () => {
    return logApis.backlog(limit,page,logType,controllerType,startDate,endDate);
  });
}
