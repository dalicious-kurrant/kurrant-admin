export const removeParentKeyInCheckbox = checkboxStatus => {
  const currentChekboxStatus = {...checkboxStatus};

  delete currentChekboxStatus.parent;

  return currentChekboxStatus;
};
