import {
  extractOnlyTruesNumberArray,
  removeParentKeyInCheckbox,
} from 'common/Table/Logics';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

export const sendFinal = (data, sendFinalMutate, checkboxStatus) => {
  const checkboxStatusNow = {...removeParentKeyInCheckbox(checkboxStatus)};

  let selectedData = [];

  Object.entries(checkboxStatusNow).forEach(value => {
    if (value[1] === true) {
      selectedData.push(value[0]);
    }
  });

  let finalLaunch = [];

  data.map(value => {
    if (selectedData.includes(value.id.toString())) {
      finalLaunch.push(value);
    }
  });

  const newData = finalLaunch.map(value => {
    let yo = {};

    // 우선 아래의 항목만 수정가능하게 만듬

    // yo['userId'] = handleFalsyValueToBlank(value.email);

    // '유저타입' 값 치환하기

    let roleValue = '';
    if (value.role === 'USER') {
      roleValue = '일반';
    } else if (value.role === 'MANAGER') {
      roleValue = '관리자';
    } else if (value.role === '일반' || value.role === '관리자') {
      roleValue = value.role;
    } else {
      window.confirm("유저타입의 값은 '일반' 아니면 '관리자'로 해주세요");
      return;
    }

    yo['userId'] = parseInt(value.id);
    yo['password'] = handleFalsyValueToBlank(value.password);
    yo['name'] = handleFalsyValueToBlank(value.userName);
    yo['email'] = handleFalsyValueToBlank(value.email);
    yo['phone'] = handleFalsyValueToBlank(value.phone);
    yo['role'] = roleValue;

    return yo;
  });

  const newData2 = {
    userList: newData,
  };

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    sendFinalMutate(newData2);
  } else {
    return;
  }
};

export const sendDelete = (deleteFinalMutate, checkboxStatus) => {
  // console.log(deleteFinalMutate);
  // console.log(checkboxStatus)
  console.log(extractOnlyTruesNumberArray(checkboxStatus));

  const submitData = {
    useIdList: extractOnlyTruesNumberArray(checkboxStatus),
    groupId: 1,
  };

  if (window.confirm('정보가 삭제됩니다 진행하시겠습니까?')) {
    deleteFinalMutate(submitData);
  } else {
    return;
  }
};

// 유저타입 USER -> 일반 , MANAGER -> 관리자

export const shiftUserType = customerData => {
  const shifted = [...customerData];

  const shiftedData = shifted.map(value => {
    if (value.role === 'USER') {
      value.role = '일반';
    } else if (value.role === 'MANAGER') {
      value.role = '관리자';
    } else if (value.role === 'GUEST') {
      value.role = '게스트';
    }
    return value;
  });

  return shiftedData;
};
