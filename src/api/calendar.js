import instance from '../shared/axios';

export const calendarApis = {
  createDailyFood: async data => await instance.post('schedules/excel', data),
  getDailyFood: async (size, page) =>
    await instance.get(`schedules/all?size=${size}&page=${page}`),
  getRecommnadDailyFood: async (startDate, size, page) =>
    await instance.get(`schedules/recommends`, {
      params: {
        startDate: startDate,
        size: size,
        page: page,
      },
    }),
};
