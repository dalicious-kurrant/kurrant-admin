import instance from 'shared/axios';

export const recommendMakersApis = {
  getMakers: async () => await instance.get('recommend/makersInfos'),
  getRecommendMakersList: async (
    page,
    selectStatus,
    selectMakers,
    selectSpots,
  ) =>
    await instance.get(
      `application-forms/recommend/makers?limit=50&page=${page}`,
      {
        params: {
          status: selectStatus,
          makersName: selectMakers,
          groupId: selectSpots,
        },
      },
    ),
  modifyStatus: async data =>
    await instance.patch(
      `application-forms/recommend/makers/status/${data.id}`,
      {status: data.status},
    ),
};
