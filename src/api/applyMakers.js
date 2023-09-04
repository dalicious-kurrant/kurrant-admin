import instance from 'shared/axios';

export const applyMakersApis = {
  makersList: async page =>
    await instance.get(`application-forms/makers?limit=50&page=${page}`),
  applyMakers: async data =>
    await instance.post('application-forms/makers', data),
  modifyStatus: async data =>
    instance.patch(`application-forms/makers/status/${data.id}`, {
      status: data.status,
    }),
  deleteApplyMakers: async id =>
    await instance.delete('application-forms/makers', {data: id}),
};
