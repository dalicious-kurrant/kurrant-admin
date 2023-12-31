import {checkedValue, numberOfTrues} from '../Logics/Logics';



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

  mutate({
    saveSpotList: [...removeDelete],
  });
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
  deleteFinalMutate,
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
    let deleteIdArray = [];
    let spotInfoList = [...data];

    Object.entries(checkboxStatus).forEach(v => {
      if (v[1] === true) {
        // console.log(v[0]);

        const deleteData = spotInfoList.find(val => val.id === parseInt(v[0]));
        // console.log(deleteData);s
        deleteIdArray.push(deleteData.spotId);
      }
    });

    if (window.confirm(`${deleteIdArray.toString()}를 삭제하시겠습니까?`)) {
      deleteFinalMutate(deleteIdArray);
    } else {
      return;
    }
  }
};

export const addGroupIdNameInSpotInfoFieldsData = groupIdNameData => {
  const yes1 = groupIdNameData.map(v => {
    v['name'] = v.groupName;
    v['value'] = v.groupId;

    const {groupId, groupName, ...removedGroupIdGroupName} = v;

    return removedGroupIdGroupName;
  });

  const yes = [{name: '필수 선택', value: undefined}, ...yes1];

  return yes;
};
