import {handleFalsyValueToString} from 'utils/valueHandlingLogics';

export const sendFinal = (data, sendFinalMutate) => {
  const oldData = [...data];

  console.log(oldData);

  const newData = oldData.map(value => {
    let yo = {};

    // 아래는 유저꺼임

    // // yo['userId'] = handleFalsyValue(value.id);
    // yo['userId'] = handleFalsyValueToString(value.email);
    // // yo['password'] = handleFalsyValue(value.password);
    // yo['password'] = handleFalsyValueToString(value.password);
    // yo['name'] = handleFalsyValueToString(value.name);
    // yo['email'] = handleFalsyValueToString(value.email);
    // yo['phone'] = handleFalsyValueToString(value.phone);
    // // yo['phone'] = `010-6565-1181`;
    // yo['role'] = handleFalsyValueToString(value.role);

    return yo;
  });

  // console.log(newData);

  const newData2 = {
    userList: newData,
  };

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    // sendFinalMutate(newData2);
  } else {
  }
};

export const makeId = dataInput => {
  return dataInput.map((v, i) => {
    v['id'] = i + 1;
    return v;
  });
};
