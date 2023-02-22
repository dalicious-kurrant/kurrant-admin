import {useAtom} from 'jotai';

import {SpotInfoDataAtom} from './store';

const useMutate = () => {
  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);

  const submitMutate = input => {
    const newDataList = [...spotInfoData, input];

    setSpotInfoData(newDataList);
  };

  const editMutate = input => {
    // input : 객체

    const oldDataList = [...spotInfoData];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == input.id) {
        newDataList.push(input);
      } else {
        newDataList.push(oldDataList[i]);
      }
    }

    setSpotInfoData(newDataList);
  };

  const deleteMutate = id => {
    const oldDataList = [...spotInfoData];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == id) {
      } else {
        newDataList.push(oldDataList[i]);
      }
    }
    setSpotInfoData(newDataList);
  };

  return {submitMutate, editMutate, deleteMutate};
};

export default useMutate;
