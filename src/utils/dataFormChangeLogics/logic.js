export const fillMakersDropboxObject = makersListFromServer => {
  const makersListDropboxArray = makersListFromServer.map(v => {
    return {
      value: v.makersId,
      label: v.makersName,
    };
  });

  return [{value: 'none', label: '전체'}, ...makersListDropboxArray];
};
export const fillMakersDropboxObjectForFoodGroup = makersListFromServer => {
  const makersListDropboxArray = makersListFromServer.map(v => {
    return {
      value: v.makersName,
      label: v.makersName,
    };
  });

  return [{value: 'none', label: '전체'}, ...makersListDropboxArray];
};
export const fillGroupsDropboxObjectForRecommendation =
  groupsListFromServer => {
    const groupsListDropboxArray = groupsListFromServer.map(v => {
      return {
        value: v.groupName,
        label: v.groupName,
      };
    });

    return [...groupsListDropboxArray];
  };
export const fillFoodGroupDropboxObjectForRecommendation =
  foodGroupListFromServer => {
    const foodGroupListDropboxArray = foodGroupListFromServer.map(v => {
      return {
        value: v.name,
        label: v.name,
      };
    });

    return [...foodGroupListDropboxArray];
  };

export const adaptFoodGroupListToFoodGroupDropboxOptions = arr => {
  if (arr[0] === '') {
    return [];
  }

  return arr.map((v, i) => {
    return {
      key: i,
      value: v,
      label: v,
    };
  });
};
