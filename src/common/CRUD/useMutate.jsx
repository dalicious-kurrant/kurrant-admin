import {useAtom} from 'jotai';
import {getCompanyMembershipDataAtom} from 'jotai/state';
import styled from 'styled-components';

const useMutate = () => {
  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataAtom,
  );

  const submitMutate = input => {
    const newDataList = [...companyMembershipDataList, input];

    setCompanyMembershipDataList(newDataList);
  };

  const editMutate = input => {
    // input : 객체

    const oldDataList = [...companyMembershipDataList];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == input.id) {
        newDataList.push(input);
      } else {
        newDataList.push(oldDataList[i]);
      }
    }

    setCompanyMembershipDataList(newDataList);
  };

  const deleteMutate = id => {
    const oldDataList = [...companyMembershipDataList];
    let newDataList = [];
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id == id) {
      } else {
        newDataList.push(oldDataList[i]);
      }
    }
    setCompanyMembershipDataList(newDataList);
  };

  return {submitMutate, editMutate, deleteMutate};
};

export default useMutate;
