import {
  extractOnlyTruesNumberArray,
  removeParentKeyInCheckbox,
} from 'common/Table/Logics';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

export const sendFinal = (
  data,
  sendFinalMutate,
  checkboxStatus,
  tableDeleteList,
  deleteFinalMutate,
) => {
  if (
    !Object.values(checkboxStatus).includes(true) &&
    tableDeleteList.length < 1
  ) {
    window.confirm('체크된 항목이 없습니다 ');
    return;
  }

  let newData2 = {
    userList: [],
  };

  if (Object.values(checkboxStatus).includes(true)) {
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

    console.log(finalLaunch);
    let newData = [];

    newData = finalLaunch.map(value => {
      let yo = {};

      // 우선 아래의 항목만 수정가능하게 만듬

      // yo['userId'] = handleFalsyValueToBlank(value.email);

      // '유저타입' 값 치환하기

      let roleValue = '';
      if (value.role === 'USER') {
        roleValue = '일반';
      } else if (value.role === 'MANAGER') {
        roleValue = '관리자';
      } else if (value.role === 'GUEST') {
        roleValue = '게스트';
      } else {
        roleValue = '';
      }

      // yo['userId'] = parseInt(value.id);
      // yo['password'] = handleFalsyValueToBlank(value.password);
      // yo['name'] = handleFalsyValueToBlank(value.userName);
      // yo['email'] = handleFalsyValueToBlank(value.email);
      // yo['phone'] = handleFalsyValueToBlank(value.phone);
      // yo['role'] = roleValue;
      // yo['status'] = 1;
      // yo['groupName'] = value.groupName;
      // yo['point'] = value.point;
      // yo['gourmetType'] = value.gourmetType;
      // yo['isMembership'] = value.isMembership;
      // yo['marketingAgree'] = true;
      // yo['marketingAgreedDateTime'] = '2023-02-28 10:28:30';
      // yo['marketingAlarm'] = true;
      // yo['userOrderAlarm'] = true;
      // yo['recentLoginDateTime'] = value.recentLoginDateTime;
      // yo['userCreatedDateTime'] = value.userCreatedDateTime;

      /////

      yo['userId'] = parseInt(value.id);
      yo['password'] = handleFalsyValueToBlank(value.password);
      yo['name'] = handleFalsyValueToBlank(value.userName);
      yo['email'] = handleFalsyValueToBlank(value.email);
      yo['phone'] = handleFalsyValueToBlank(value.phone)
        ? handleFalsyValueToBlank(value.phone)
        : '010-0000-0000';
      yo['role'] = roleValue ? roleValue : '일반';
      yo['status'] = value.status ? value.status : 1;
      yo['groupName'] = value.groupName ? value.groupName : '달리셔스';
      yo['point'] = 1;
      yo['gourmetType'] = 0;
      yo['isMembership'] = true;
      yo['marketingAgree'] = true;
      yo['marketingAgreedDateTime'] = '2000-01-01 00:00:00';
      yo['marketingAlarm'] = true;
      yo['userOrderAlarm'] = true;
      yo['recentLoginDateTime'] = '2000-01-01 00:00:00';
      yo['userCreatedDateTime'] = '2000-01-01 00:00:00';

      return yo;
    });

    console.log(newData);

    newData2 = {
      userList: newData,
    };
  }

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    if (newData2.userList.length > 0) {
      sendFinalMutate(newData2);
    }

    console.log(tableDeleteList);

    if (tableDeleteList.length > 0) {
      sendDelete(tableDeleteList, deleteFinalMutate);
    }
  } else {
    return;
  }
};

const sendDelete = (tableDeleteList, deleteFinalMutate) => {
  const toNumList = tableDeleteList.map(v => {
    return parseInt(v);
  });

  // 스트링 -> 넘버

  const submitData = {
    userIdList: toNumList,
    groupId: 1,
  };

  deleteFinalMutate(submitData);

  // if (window.confirm('정보가 삭제됩니다 진행하시겠습니까?')) {

  // } else {
  //   return;
  // }
};

// 유저타입 USER -> 일반 , MANAGER -> 관리자

export const shiftUserType = customerData => {
  if (customerData.length > 0) {
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
  }
};

// 비밀번호 5자로 줄이기

export const sliceStringDataByKey = (customerData, key, charLength) => {
  if (!customerData) return;

  const shifted = [...customerData];

  const slicedData = shifted.map(v => {
    v[key] = `${v[key].slice(0, charLength)}...`;

    return v;
  });

  return slicedData;
};
