import {useAtom} from 'jotai';

const useMutate = atom => {
  const [dataList, setDataList] = useAtom(atom);

  const submitMutate = input => {
    const newDataList = [...dataList, input];

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

  const deleteMutate = id => {
    const oldDataList = [...dataList];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == id) {
      } else {
        newDataList.push(oldDataList[i]);
      }
    }
    setDataList(newDataList);
  };

  return {submitMutate, editMutate, deleteMutate};
};

export default useMutate;
