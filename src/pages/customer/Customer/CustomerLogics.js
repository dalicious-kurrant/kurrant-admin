import {removeParentKeyInCheckbox} from 'common/Table/Logics';
import {
  handleFalsyValueToBlank,
  handleFalsyValueToString,
} from 'utils/valueHandlingLogics';

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

  // console.log(finalLaunch);

  const newData = finalLaunch.map(value => {
    let yo = {};

    // 우선 아래의 항목만 수정가능하게 만듬

    // yo['userId'] = handleFalsyValueToBlank(value.email);

    yo['userId'] = parseInt(value.id);
    yo['password'] = handleFalsyValueToBlank(value.password);
    yo['name'] = handleFalsyValueToBlank(value.userName);
    yo['email'] = handleFalsyValueToBlank(value.email);
    yo['phone'] = handleFalsyValueToBlank(value.phone);
    yo['role'] = handleFalsyValueToString(value.role);

    return yo;
  });

  console.log(newData);

  const newData2 = {
    userList: finalLaunch,
  };

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    sendFinalMutate(newData2);
  } else {
  }
};
