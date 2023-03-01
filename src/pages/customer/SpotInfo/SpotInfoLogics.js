import {removeParentKeyInCheckbox} from 'common/Table/Logics';
import {handleFalsyValueToString} from 'utils/valueHandlingLogics';

export const sendFinal = (
  data,
  sendFinalMutate,

  checkboxStatus,
  tableDeleteList,
  deleteFinalMutate,
) => {
  if (!Object.values(checkboxStatus).includes(true)) {
    window.confirm('체크된 항목이 없습니다 ');
    return;
  }

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
    yo['spotName'] = value.spotName;
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

  const newData2 = {
    saveSpotList: newData,
  };

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    sendFinalMutate(newData2);
    // sendDelete(tableDeleteList, deleteFinalMutate);
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
    useIdList: toNumList,
    groupId: 1,
  };

  console.log(submitData);

  // if (window.confirm('정보가 삭제됩니다 진행하시겠습니까?')) {
  //   deleteFinalMutate(submitData);
  // } else {
  //   return;
  // }
};

export const makeId = dataInput => {
  return dataInput.map((v, i) => {
    v['id'] = i + 1;
    return v;
  });
};
