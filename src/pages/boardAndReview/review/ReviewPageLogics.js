export const fillMakersDropboxObject = makersListFromServer => {
  // value와 label형태로 만들기

  const makersListDropboxArray = makersListFromServer.map(v => {
    return {
      value: v.makersId,
      label: v.makersName,
    };
  });

  return makersListDropboxArray;
};
