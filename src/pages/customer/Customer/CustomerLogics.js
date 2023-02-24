import {
  handleFalsyValueToBlank,
  handleFalsyValueToString,
} from 'utils/valueHandlingLogics';

export const sendFinal = (data, sendFinalMutate) => {
  const oldData = [...data];

  const newData = oldData.map(value => {
    let yo = {};

    // yo['userId'] = handleFalsyValue(value.id);
    yo['userId'] = handleFalsyValueToBlank(value.email);
    // yo['password'] = handleFalsyValue(value.password);
    yo['password'] = handleFalsyValueToBlank(value.password);
    yo['name'] = handleFalsyValueToBlank(value.name);
    yo['email'] = handleFalsyValueToBlank(value.email);
    yo['phone'] = handleFalsyValueToBlank(value.phone);
    // yo['phone'] = `010-6565-1181`;
    yo['role'] = handleFalsyValueToString(value.role);

    return yo;
  });

  console.log(newData);

  const newData2 = {
    userList: newData,
  };

  if (
    window.confirm(
      '테이블에 있는 데이터를 최종적으로 변경합니다 진행하시겠습니까?',
    )
  ) {
    sendFinalMutate(newData2);
  } else {
  }
};
