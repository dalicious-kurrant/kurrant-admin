// import {CRUDAvaliableList} from 'data/CRUDAvaliableList';

import {makeInitialInput} from 'common/CRUD/Register/logics/RegisterLogics';

// export const isCRUDAvaliable = pathname => {
//   return CRUDAvaliableList.map(value => `/main/${value}`).includes(pathname);
// };

export const numberOfTrues = checkboxStatus => {
  // console.log(checkboxStatus);
  let total = 0;
  const yo = {...checkboxStatus};
  delete yo.parent;

  Object.values(yo).forEach(value => {
    if (value === true) {
      total = total + 1;
    }
  });

  return total;
};

export const checkedValue = (checkboxStatus, dataList) => {
  let checkedId = undefined;
  let returnValue;
  Object.entries({...checkboxStatus}).forEach(value => {
    if (value[1] === true) {
      checkedId = value[0];
    }
  });

  [...dataList].forEach(value => {
    if (value.id.toString() == checkedId) {
      returnValue = value;
    }
  });

  return returnValue;
};

export const idsToDelete = checkboxStatus => {
  const returnIdsToDelete = [];

  Object.keys({...checkboxStatus}).forEach(value => {
    if ({...checkboxStatus}[value]) {
      returnIdsToDelete.push(value);
    }
  });

  return returnIdsToDelete;
};

export const clickButtonBundle = (
  buttonStatus,
  fieldsToOpen,
  data,
  checkboxStatus,
  setDataToEdit,

  setRegisterStatus,
  setShowRegister,
  deleteMutate,
) => {
  numberOfTrues({...checkboxStatus});

  if (buttonStatus === 'register') {
    setDataToEdit(makeInitialInput(fieldsToOpen));
    setRegisterStatus(buttonStatus);
    setShowRegister(true);
  } else if (buttonStatus === 'edit') {
    if (numberOfTrues({...checkboxStatus}) === 0) {
      window.confirm(
        "아래의 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
      );
    } else if (numberOfTrues({...checkboxStatus}) !== 1) {
      window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
    } else if (numberOfTrues({...checkboxStatus}) === 1) {
      setDataToEdit(checkedValue(checkboxStatus, data));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    }
  } else if (buttonStatus === 'delete') {
    if (numberOfTrues === 0) {
      window.confirm(
        "아래의 리스트중에 체크박스를 눌러 수정할 리스트를 '하나만' 선택해주세요.",
      );
      return;
    }

    if (window.confirm('삭제하시겠습니까?')) {
      idsToDelete({...checkboxStatus}).forEach(value => {
        deleteMutate(value);
      });
    } else {
      return;
    }
  }
};
