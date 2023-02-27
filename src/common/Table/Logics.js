export const removeParentKeyInCheckbox = checkboxStatus => {
  const currentChekboxStatus = {...checkboxStatus};

  delete currentChekboxStatus.parent;

  return currentChekboxStatus;
};

export const extractOnlyTruesNumberArray = checkboxStatus => {
  const yes = removeParentKeyInCheckbox({...checkboxStatus});

  let yo = [];

  Object.entries(yes).forEach(value => {
    if (value[1] === true) {
      yo.push(parseInt(value[0]));
    }
  });

  return yo;
};
