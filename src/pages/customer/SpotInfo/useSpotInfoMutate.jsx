import {useAtom} from 'jotai';
import {SpotInfoGroupIdNameAtom} from './store';

const useSpotInfoMutate = atom => {
  const [dataList, setDataList] = useAtom(atom);
  const [groupIdNameData] = useAtom(SpotInfoGroupIdNameAtom);
  const submitMutate = input => {
    // 스팟 이름을 입력하면 아이디, 이름 둘다 선택하게 하기
    // 이거 이대로 두면 안됨 나중에 바꿔야됨
    const yo = {...input};

    groupIdNameData.forEach(v => {
      if (v.value === yo.groupId) {
        yo.groupName = v.name;
      }
    });

    // "" -> null로 고치기

    const yo2 = Object.entries(yo).map(v => {
      if (v[1] === '') {
        return [v[0], null];
      } else {
        return v;
      }
    });
    let yo3 = {};
    yo2.forEach(v => {
      yo3[v[0]] = v[1];
    });

    // console.log(yo3);

    // status 추가

    yo3['status'] = 1;

    const newDataList = [...dataList, yo3];
    setDataList(newDataList);
  };

  const editMutate = input => {
    // input : 객체

    const oldDataList = [...dataList];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == input.id) {
        newDataList.push(input);
      } else {
        newDataList.push(oldDataList[i]);
      }
    }

    setDataList(newDataList);
  };

  return {submitMutate, editMutate};
};

export default useSpotInfoMutate;
