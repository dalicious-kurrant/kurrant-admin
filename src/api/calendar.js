import instance from '../shared/axios';

export const calendarApis = {
  createDailyFood: async data => await instance.post('schedules/excel', data),
  presetDailyFood: async data => await instance.post('schedules/pause', data),
  completeDailyFood: async data =>
    await instance.post('dailyFoods/approval', data),
  getDailyFood: async (size, page, makersId, groupId, status) =>
    await instance.get(`schedules/all`, {
      params: {
        limit: size,
        page: page,
        makersId: makersId.join(','),
        groupId: groupId.join(','),
        status: status.join(','),
      },
    }),
  getCompleteDailyFood: async (
    startDate,
    endDate,
    size,
    page,
    makersId,
    groupId,
  ) =>
    await instance.get(`dailyFoods`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        // limit: size,
        // page: page,
        makersIds: makersId.join(','),
        groupIds: groupId.join(','),
      },
    }),
  getFilterList: async () => await instance.get(`dailyFoods/groupsAndMakers`),
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
        limit: size,
        page: page,
        makersId: makersId.join(','),
        groupId: groupId.join(','),
        status: status.join(','),
      },
    }),
};
