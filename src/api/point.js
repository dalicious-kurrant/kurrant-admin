import instance from 'shared/axios';

export const pointApis = {
  pointPolicy: async () => await instance.get('points/policy/review'),
  eventPolicy: async () => await instance.get('points/policy/event'),
  addEvent: async data => await instance.post('points/policy/event', data),
  deleteEvent: async policyId =>
    await instance.delete(`points/policy/event?policyId=${policyId}`),
  editEvent: async data =>
    await instance.patch(
      `points/policy/event?policyId=${data.policyId}`,
      data.body,
    ),
};
