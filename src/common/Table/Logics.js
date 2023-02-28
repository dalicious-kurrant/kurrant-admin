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

export const makeId = dataInput => {
  return dataInput.map((v, i) => {
    v['id'] = i + 1;
    return v;
  });
};

export const removeIdToSend = dataInput => {
  return dataInput.map((v, i) => {
    delete v.id;
    return v;
  });
};

export const isInCheckFilterList = (filterList, fieldName) => {
  // console.log(filterList);
  // console.log(fieldName);

  const yo = [...filterList];
  let jojo = false;
  yo.forEach(v => {
    if (v.fieldName === fieldName) {
      console.log(fieldName);
      jojo = true;
    }
  });

  return jojo;
};
