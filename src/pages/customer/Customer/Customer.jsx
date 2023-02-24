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
import {sendFinal} from './CustomerLogics';
import usePagination from 'common/test/Pagination/usePagination';
import Pagination from 'common/test/Pagination/Pagination';
import PaginationTest from './PaginationTest';

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

  // const {status, isLoading} = useCustomerData(
  //   ['getCustomerJSON'],
  //   CustomerDataAtom,
  //   'users/all',
  //   token,
  // );

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

  // 페이지네이션

  // 두가지만 백엔드랑 연결하면 됨

  // 1. 페이지네이션 처리가 된 URL
  //  `http://localhost:3010/customer?_page=${queryKey[1]}&_limit=${queryKey[2]}`,

  // 2. 백엔드에 있는 데이터의 총 길이

  const [page, setPage] = useState(12);
  const [limit, setLimit] = useState(1);

  PaginationTest(page, limit);

  const {totalPageArray, totalPageByLimit} = usePagination(12, limit, page);

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

      <div>
        <Pagination
          pageList={totalPageArray}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          lastPage={totalPageByLimit}
          selectOptionArray={[1, 2, 4, 10]}
        />
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
