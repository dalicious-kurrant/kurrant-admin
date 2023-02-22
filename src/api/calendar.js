import instance from '../shared/axios';

export const calendarApis = {
  createDailyFood: async data => await instance.post('schedules/excel', data),
};
