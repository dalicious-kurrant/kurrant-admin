import instance from 'shared/axios';

export const noticeApis = {
  uploadImage: async (formData, config) =>
    await instance.post(`admins/files/image/0`, formData, config),
  appNoticePost: async data => await instance.post('board/app', data),
  appNoticeGet: async (
    page,
    selectType,
    selectStatus,
    selectSpots,
    selectPush,
  ) =>
    await instance.get(`board/app?limit=15&page=${page}`, {
      params: {
        isStatus: selectStatus,
        boardType: selectType,
        groupIds: selectSpots.length === 0 ? null : selectSpots.join(','),
        isPushAlarm: selectPush,
      },
    }),
  appNoticeModify: async data =>
    await instance.patch(`board/app/${data.id}`, data.data),
  appNoticePush: async id => await instance.post('board/app/push', id),
  // 메이커스
  makersNoticeGet: async (
    page,
    selectType,
    selectStatus,
    selectMakers,
    selectPush,
  ) =>
    await instance.get(`board/makers?limit=15&page=${page}`, {
      params: {
        isStatus: selectStatus,
        boardType: selectType,
        makersId: selectMakers,
        isAlarmTalk: selectPush,
      },
    }),
  makersNoticePost: async data => await instance.post('board/makers', data),
  makersNoticeModify: async data =>
    await instance.patch(`board/makers/${data.id}`, data.data),
  // 고객사
  clientNoticeGet: async (
    page,
    selectType,
    selectStatus,
    selectSpots,
    selectPush,
  ) =>
    await instance.get(`board/client?limit=15&page=${page}`, {
      params: {
        isStatus: selectStatus,
        boardType: selectType,
        groupIds: selectSpots.length === 0 ? null : selectSpots.join(','),
        isAlarmTalk: selectPush,
      },
    }),
  clientNoticePost: async data => await instance.post('board/client', data),
  clientNoticeModify: async data =>
    await instance.patch(`board/client/${data.id}`, data.data),
  alramTalk: async id => await instance.post('board/alarm/talk', id),
};
