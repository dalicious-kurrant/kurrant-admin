import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';

import {clickButtonBundle} from '../Logics/Logics';
import {CustomerFieldsData, CustomerFieldsToOpen} from './CustomerInfoData';

import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';

import {CustomerDataAtom} from './store';

import useCustomerData from './useCustomerData';
import CustomTable from 'common/Table/CustomTable';
import {useMutation, useQueryClient} from 'react-query';

import instance from 'shared/axios';
import {sendDelete, sendFinal} from './CustomerLogics';

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
  const {mutate: deleteFinalMutate} = useMutation(
    async todo => {
      const response = await instance.patch(`client/members`, todo);

      console.log(todo);

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
    clickButtonBundle(
      buttonStatus,
      CustomerFieldsToOpen,
      customerData,
      checkboxStatus,
      setDataToEdit,
      setRegisterStatus,
      setShowRegister,
      deleteMutate,
    );
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

  // useEffect(() => {
  //   console.log(customerData);
  // }, [customerData]);

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <PageWrapper>
      <BtnWrapper>
        {/* <Button color="red" content="삭제" icon="delete" onClick={onActive} /> */}
      </BtnWrapper>

      <div>
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showRegister={showRegister}
          sendFinal={() => {
            sendFinal(customerData, sendFinalMutate, checkboxStatus);
          }}
          sendDelete={() => {
            sendDelete(deleteFinalMutate, checkboxStatus);
          }}
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
