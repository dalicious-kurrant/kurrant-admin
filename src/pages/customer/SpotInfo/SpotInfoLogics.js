import {removeParentKeyInCheckbox} from 'common/Table/Logics';
import {handleFalsyValueToString} from 'utils/valueHandlingLogics';

export const handleSpotInfoDelete = (
  checkboxStatus,
  tableDeleteList,
  spotInfoData,
  setTableDeleteList,
  setSpotInfoData,
) => {
  const status = {...checkboxStatus};

  let deleteList = [...tableDeleteList];

  Object.entries(status).forEach(v => {
    if (v[1] === true) {
      deleteList.push(v[0]);
    }
  });
  deleteList = [...new Set(deleteList)];

  let yo = [];
  const spotInfoDataToDelete = [...spotInfoData];

  spotInfoDataToDelete.forEach(v => {
    if (deleteList.includes(v.id.toString())) {
      v['isOnDeleteList'] = true;
      yo.push(v);
    } else {
      yo.push(v);
    }
  });

  setTableDeleteList(deleteList);
  setSpotInfoData(yo);
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
    saveSpotList: [],
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
      let yo = {};

      yo['spotId'] = parseInt(value.id);
      yo['spotName'] = value.spotName ? value.spotName : '';
      yo['groupId'] = parseInt(value.groupId); // 1, 2, 3
      yo['groupName'] = value.groupName; // 빈칸 가능
      yo['zipCode'] = value.zipCode ? value.zipCode : '00000'; // 빈칸이면 안됨, 00000
      yo['address1'] = value.address1 ? value.address1 : ''; // 빈칸 가능
      yo['address2'] = value.address2 ? value.address2 : ''; // 빈칸 가능
      yo['location'] = value.location ? value.location : ''; // 빈칸 가능
      yo['diningType'] = value.diningType ? value.diningType : '1'; //  1,2,3, 복수선택 가능 스트링임
      yo['lastOrderTime'] = value.lastOrderTime
        ? value.lastOrderTime
        : '00:00:00'; //  "00:00:00"형식 준수
      yo['breakfastDeliveryTime'] = value.breakfastDeliveryTime
        ? value.breakfastDeliveryTime
        : '00:00:00'; //  "00:00:00"형식 준수
      yo['breakfastUseDays'] = value.breakfastUseDays
        ? value.breakfastUseDays
        : null; //null가능 빈칸 가능 월, 수 금
      yo['breakfastSupportPrice'] = value.breakfastSupportPrice
        ? value.breakfastSupportPrice
        : null; // null가능number, 0 가능
      yo['lunchDeliveryTime'] = value.lunchDeliveryTime
        ? value.lunchDeliveryTime
        : null; // null가능"00:00:00"형식 준수
      yo['lunchUseDays'] = value.lunchUseDays ? value.lunchUseDays : null; //null가능 빈 칸 가능 "월, 화 수목금"
      yo['lunchSupportPrice'] = value.lunchSupportPrice
        ? value.lunchSupportPrice
        : null; // null가능number 0가능
      yo['dinnerDeliveryTime'] = value.dinnerDeliveryTime
        ? value.dinnerDeliveryTime
        : null; // null 가능,
      yo['dinnerUseDays'] = value.dinnerUseDays ? value.dinnerUseDays : null; //null가능
      yo['dinnerSupportPrice'] = value.dinnerSupportPrice
        ? value.dinnerSupportPrice
        : null; //null가능

      return yo;
    });

    newData2 = {
      saveSpotList: newData,
    };
  }

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    if (newData2.saveSpotList.length > 0) {
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
    window.confirm('등록할 값들이 들어있는지 다시한번 확인해 주세요');
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

  const yo = {
    saveSpotList: [...removeDelete],
  };

  console.log(yo);
  mutate(yo);
};
