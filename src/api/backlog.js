import instance from 'shared/axios';

export const logApis = {
  backlog: async (limit, page, logType, controllerType, startDate, endDate) => {
    console.log(controllerType, logType);
    const log = logType.length > 0 ? `&logType=${logType.join(',')}` : '';
    const controller =
      controllerType.length > 0
        ? `&controllerType=${controllerType.join(',')}`
        : '';
    const startDates = startDate && `&startDate=${startDate}`;
    const endDates = endDate && `&endDate=${endDate}`;
    const url = `logs?limit=${limit}&page=${page}${logType ? log : ''}${
      controllerType ? controller : ''
    }${startDate ? startDates : ''}${endDate ? endDates : ''}`;
    return await instance.get(url);
  },
};
