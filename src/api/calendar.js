import instance from '../shared/axios';

export const calendarApis = {
  createDailyFood: async data => await instance.post('schedules/excel', data),
  presetDailyFood: async data => await instance.post('schedules/pause', data),
  getDailyFood: async (size, page, makersId, groupId, status) =>
    await instance.get(`schedules/all`, {
      params: {
        size: size,
        page: page,
        makersId: makersId.join(','),
        groupId: groupId.join(','),
        status: status.join(','),
      },
    }),
  getRecommnadDailyFood: async (
    startDate,
    endDate,
    size,
    page,
    makersId,
    groupId,
    status,
  ) =>
    await instance.get(`schedules/recommends`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        size: size,
        page: page,
        makersId: makersId.join(','),
        groupId: groupId.join(','),
        status: status.join(','),
      },
    }),
};
