import instance from 'shared/axios';

export const logApis = {
  backlog: async (limit,page,logType,controllerType,startDate,endDate) =>{
    const log = logType && `&logType=${logType}`
    const controller = controllerType && `&controllerType=${controllerType}`
    const startDates = startDate && `&startDate=${startDate}`
    const endDates = endDate && `&endDate=${endDate}`
    const url  = `logs?limit=${limit}&page=${page}${logType ? log : ''}${controllerType ? controller : ''}${startDate ? startDates : ''}${endDate ? endDates : ''}`
    return await instance.get(url)
    },
};
