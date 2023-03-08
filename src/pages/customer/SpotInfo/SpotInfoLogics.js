import {checkedValue, idsToDelete, numberOfTrues} from '../Logics/Logics';

const sendDelete = (tableDeleteList, deleteFinalMutate) => {
  const toNumList = tableDeleteList.map(v => {
    return parseInt(v);
  });

  // 스트링 -> 넘버

  const submitData = {
    spotIdList: toNumList,
  };

  deleteFinalMutate(submitData);
};

export const makeId = dataInput => {
  return dataInput.map((v, i) => {
    v['id'] = i + 1;
    return v;
  });
};

export const saveSpotToDb = (data, mutate, deleteList) => {
  if (data.length < 1) {
    // window.confirm('등록할 값들이 들어있는지 다시한번 확인해 주세요');
    return;
  }

  // id 지우기
  const spreadData = [...data];

  const idRemove = spreadData.map(v => {
    const {id, ...otherValue} = v;

    return otherValue;
  });

  // delete추가하기

  let removeDelete = [];

  idRemove.forEach(v => {
    if (!Object.keys(v).includes('isOnDeleteList')) {
      removeDelete.push(v);
    }
  });

  // 값이 하나도 없을 때
  console.log(removeDelete);
  if (removeDelete.length < 1) {
    if (
      window.confirm(
        '등록하려는 값이 하나도 없습니다 이대로 진행해면 모든 데이터들은 초기화됩니다 이대로 진행하시겠습니까?',
      )
    ) {
    } else {
      return;
    }
  }

  // const test = [...removeDelete].slice(7);
  const test = [...removeDelete];
  const yo = {
    saveSpotList: [...test],
  };

  console.log(yo);

  // localStorage.setItem('hi', JSON.stringify(removeDelete));
  mutate(yo);
};

const makeSpotInfoInitialInput = (data, spotIdList) => {
  let initialInput = {
    spotId: 0,
    spotName: '',
    groupId: 0,
    groupName: '',
    zipCode: '',
    address1: '',
    address2: '',
    location: '',
    diningType: '',
    breakfastLastOrderTime: '',
    breakfastDeliveryTime: '',
    breakfastUseDays: '',
    breakfastSupportPrice: 0,
    breakfastMembershipBenefitTime: '',
    lunchLastOrderTime: '',
    lunchDeliveryTime: '',
    lunchUseDays: '',
    lunchSupportPrice: '',
    lunchMembershipBenefitTime: '',
    dinnerLastOrderTime: '',
    dinnerDeliveryTime: '',
    dinnerUseDays: '',
    dinnerSupportPrice: '',
    dinnerMembershipBenefitTime: '',
    createdDateTime: '',
    updatedDateTime: '',
    // breakfastLastOrderTime: null,
    // breakfastDeliveryTime: null,
    // breakfastUseDays: null,
    // breakfastSupportPrice: null,
    // breakfastMembershipBenefitTime: null,
    // lunchLastOrderTime: null,
    // lunchDeliveryTime: null,
    // lunchUseDays: null,
    // lunchSupportPrice: null,
    // lunchMembershipBenefitTime: null,
    // dinnerLastOrderTime: null,
    // dinnerDeliveryTime: null,
    // dinnerUseDays: null,
    // dinnerSupportPrice: null,
    // dinnerMembershipBenefitTime: null,
    // createdDateTime: null,
    // updatedDateTime: null,
    status: 1,
  };

  return initialInput;
};

export const clickSpotInfoButtonBundle = (
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
    //
    setDataToEdit(makeSpotInfoInitialInput(fieldsToOpen));
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
