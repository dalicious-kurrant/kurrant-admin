import {
  extractOnlyTruesNumberArray,
  removeParentKeyInCheckbox,
} from 'common/Table/Logics';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

export const handleCustomerDelete = (
  checkboxStatus,
  tableDeleteList,
  customerData,
  setTableDeleteList,
  setCustomerData,
) => {
  const status = {...checkboxStatus};

  let deleteList = [...tableDeleteList];

  Object.entries(status).forEach(v => {
    if (v[1] === true) {
      deleteList.push(v[0]);
    }
  });

  deleteList = [...new Set(deleteList)];

  let injectDeleted = [];
  const customerDataToDelete = [...customerData];

  customerDataToDelete.forEach(v => {
    if (deleteList.includes(v.id.toString())) {
      v['isOnDeleteList'] = true;
      injectDeleted.push(v);
    } else {
      injectDeleted.push(v);
    }
  });

  setTableDeleteList(deleteList);
  setCustomerData(injectDeleted);
};

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

    const newData = finalLaunch.map(value => {
      let val = {};

      // 우선 아래의 항목만 수정가능하게 만듬

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

      /////

      val['userId'] = parseInt(value.id);
      val['password'] = handleFalsyValueToBlank(value.password);
      val['name'] = handleFalsyValueToBlank(value.userName);
      val['email'] = handleFalsyValueToBlank(value.email);
      val['phone'] = handleFalsyValueToBlank(value.phone)
        ? handleFalsyValueToBlank(value.phone)
        : '010-0000-0000';
      val['role'] = roleValue ? roleValue : '일반';
      val['status'] = value.status ? value.status : 1;
      val['groupName'] = value.groupName ? value.groupName : '달리셔스';
      val['point'] = 1;
      val['gourmetType'] = 0;
      val['isMembership'] = true;
      val['marketingAgree'] = true;
      val['marketingAgreedDateTime'] = '2000-01-01 00:00:00';
      val['marketingAlarm'] = true;
      val['userOrderAlarm'] = true;
      val['recentLoginDateTime'] = '2000-01-01 00:00:00';
      val['userCreatedDateTime'] = '2000-01-01 00:00:00';

      return val;
    });

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
      } else if (value.role === 'ADMIN') {
        value.role = '관리자';
      } else if (value.role === 'MANAGER') {
        value.role = '매니저';
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
