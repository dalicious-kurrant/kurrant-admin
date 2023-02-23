import {handleFalsyValue} from 'utils/valueHandlingLogics';

export const sendFinal = (data, sendFinalMutate) => {
  const oldData = [...data];

  const newData = oldData.map(value => {
    let yo = {};

    // yo['userId'] = handleFalsyValue(value.id);
    yo['userId'] = handleFalsyValue(value.email);
    // yo['password'] = handleFalsyValue(value.password);
    yo['password'] = handleFalsyValue(value.password);
    yo['name'] = handleFalsyValue(value.name);
    yo['email'] = handleFalsyValue(value.email);
    yo['phone'] = handleFalsyValue(value.phone);
    // yo['phone'] = `010-6565-1181`;
    yo['role'] = handleFalsyValue(value.role);

    return yo;
  });

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
