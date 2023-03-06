import {removeParentKeyInCheckbox} from 'common/Table/Logics';
import {handleFalsyValueToString} from 'utils/valueHandlingLogics';

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

  // const test = [...removeDelete].slice(7);
  const test = [...removeDelete];
  const yo = {
    saveSpotList: [...test],
  };

  console.log(yo);

  // localStorage.setItem('hi', JSON.stringify(removeDelete));
  mutate(yo);
};
