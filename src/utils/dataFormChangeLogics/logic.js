export const fillMakersDropboxObject = makersListFromServer => {
  // value와 label형태로 만들기

  // 아무것도 선택 안하기

  const makersListDropboxArray = makersListFromServer.map(v => {
    return {
      value: v.makersId,
      label: v.makersName,
    };
  });

  return [{value: 'none', label: '전체'}, ...makersListDropboxArray];
};
export const fillMakersDropboxObjectForFoodGroup = makersListFromServer => {
  // value와 label형태로 만들기

  // 아무것도 선택 안하기

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
    // value와 label형태로 만들기

    // 아무것도 선택 안하기

    const groupsListDropboxArray = groupsListFromServer.map(v => {
      return {
        value: v.groupName,
        label: v.groupName,
      };
    });

    // return [{value: 'none', label: '전체'}, ...groupsListDropboxArray];
    return [...groupsListDropboxArray];
  };
