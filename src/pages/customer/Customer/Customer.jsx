import {makeInitialInput} from 'common/CRUD/Register/logics/RegisterLogics';
import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';

import {checkedValue, idsToDelete, numberOfTrues} from '../Logics/Logics';
import {CustomerFieldsData, CustomerFieldsToOpen} from './CustomerInfoData';

// import Table

import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';

import {CustomerDataAtom} from './store';

import {handleFalsyValue} from 'utils/valueHandlingLogics';

import useCustomerData from './useCustomerData';
import CustomTable from 'common/Table/CustomTable';
import {useMutation, useQueryClient} from 'react-query';

import instance from 'shared/axios';

import {useMutation, useQueryClient} from 'react-query';

import instance from 'shared/axios';
import CustomTable from 'common/Table/CustomTable';

const Customer = () => {
  const [customerData] = useAtom(CustomerDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');

  const queryClient = useQueryClient();

  const {mutate: sendFinalMutate} = useMutation(
    async todo => {
      const response = await instance.post(`users`, todo);
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries(['getCustomerJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  const {deleteMutate, submitMutate, editMutate} = useMutate(CustomerDataAtom);

  const token = localStorage.getItem('token');

  const {status, isLoading} = useCustomerData(
    ['getCustomerJSON'],
    CustomerDataAtom,
    'users/all',
    token,
  );

  const handleBundleClick = buttonStatus => {
    numberOfTrues({...checkboxStatus});

    if (buttonStatus === 'register') {
      setDataToEdit(makeInitialInput(CustomerFieldsToOpen));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    } else if (buttonStatus === 'edit') {
      if (numberOfTrues({...checkboxStatus}) === 0) {
        window.confirm(
          "아래의 리스트중에 체크박스를 눌러 수정할 리스트를 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues({...checkboxStatus}) !== 1) {
        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues({...checkboxStatus}) === 1) {
        setDataToEdit(checkedValue(checkboxStatus, customerData));
        setRegisterStatus(buttonStatus);
        setShowRegister(true);
      }
    } else if (buttonStatus === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 리스트중에 체크박스를 눌러 수정할 리스트를 '하나만' 선택해주세요.",
        );
        return;
      }

      if (window.confirm('삭제하시겠습니까?')) {
        idsToDelete({...checkboxStatus}).forEach(value => {
          deleteMutate(value);
        });
      } else {
        return;
      }
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

  const sendFinal = () => {
    const oldData = [...customerData];

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

    console.log(newData2);

    // console.log(customerData);

    if (
      window.confirm(
        '테이블에 있는 데이터를 최종적으로 변경합니다 진행하시겠습니까?',
      )
    ) {
      sendFinalMutate(newData2);
    } else {
    }
  };

  // if (isLoading)
  //   return (
  //     <>
  //       {' '}
  //       <div>로딩중입니다..</div>{' '}
  //     </>
  //   );

  // if (status === 'error')
  //   return (
  //     <div>
  //       에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
  //       있어요
  //     </div>
  //   );

  useEffect(() => {
    console.log(dataToEdit);
  }, [dataToEdit]);

  return (
    <PageWrapper>
      <BtnWrapper>
        {/* <Button color="red" content="삭제" icon="delete" onClick={onActive} /> */}
      </BtnWrapper>

      <div>
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showRegister={showRegister}
          sendFinal={sendFinal}
        />

        {showRegister && (
          <Register
            registerStatus={registerStatus}
            submitMutate={submitMutate}
            editMutate={editMutate}
            handleClose={handleClose}
            data={dataToEdit}
            fieldsToOpen={CustomerFieldsToOpen}
            fieldsData={CustomerFieldsData}
          />
        )}
      </div>

      <TableWrapper>
        {!!customerData && customerData.length !== 0 && (
          <CustomTable
            fieldsInput={CustomerFieldsToOpen}
            dataInput={customerData}
            // isMemo={true}
            // handleChange={}
          />
        )}
      </TableWrapper>
    </PageWrapper>
  );
};

export default Customer;
