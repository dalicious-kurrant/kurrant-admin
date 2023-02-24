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

import {exelUserAtom} from 'utils/store';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import Pagination from 'common/test/Pagination/Pagination';
import {sendFinal} from './CustomerLogics';

const Customer = () => {
  const [customerData] = useAtom(CustomerDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');
  const [key, setKey] = useState([]);
  const [exelUser, setExelUser] = useAtom(exelUserAtom);
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
    if (exelUser) setKey(Object.keys(exelUser[0]));
  }, [exelUser]);

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

  // const [page, setPage] = useState(12);
  // const [limit, setLimit] = useState(1);

  // PaginationTest(page, limit);

  // const {totalPageArray, totalPageByLimit} = usePagination(12, limit, page);

  return (
    <>
      {exelUser ? (
        <PageWrapper>
          <TableWrapper>
            <Table celled>
              {/* {console.log(plan)} */}
              {exelUser &&
                exelUser.map((p, i) => {
                  const HeaderData = Object.values(p);

                  if (i === 0) {
                    console.log(HeaderData, '123');
                    return (
                      <Table.Header key={'0' + i}>
                        <Table.Row>
                          {/* <Table.HeaderCell>체크박스</Table.HeaderCell> */}

                          {HeaderData.map((h, k) => {
                            return (
                              <Table.HeaderCell key={'0' + p.id + k}>
                                {h}
                              </Table.HeaderCell>
                            );
                          })}
                        </Table.Row>
                      </Table.Header>
                    );
                  } else {
                    console.log(p);
                    return (
                      <Table.Body key={i}>
                        <Table.Row>
                          {key &&
                            key.map((k, l) => {
                              console.log(p[k], 'test');
                              if (
                                k === 'breakfastDeliveryTime' ||
                                k === 'dinnerDeliveryTime' ||
                                k === 'lunchDeliveryTime'
                              ) {
                                return (
                                  <Table.Cell key={k + l}>
                                    <FlexBox>
                                      {typeof p[k] === 'object'
                                        ? formattedTime(p[k])
                                        : '-'}
                                    </FlexBox>
                                  </Table.Cell>
                                );
                              }
                              if (
                                k === 'createDateTime' ||
                                k === 'updatedDateTime'
                              ) {
                                return (
                                  <Table.Cell key={k + l}>
                                    <FlexBox>{formattedWeekDate(p[k])}</FlexBox>
                                  </Table.Cell>
                                );
                              }
                              return (
                                <Table.Cell key={`${i}` + l}>
                                  <FlexBox>{p[k]}</FlexBox>
                                </Table.Cell>
                              );
                            })}
                        </Table.Row>
                      </Table.Body>
                    );
                  }
                })}
            </Table>
          </TableWrapper>
        </PageWrapper>
      ) : (
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

          {/* <div>
            <Pagination
              pageList={pageList}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              lastPage={lastPage}
              selectOptionArray={[1, 2, 4, 10]}
            />
          </div> */}

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
      )}
    </>
  );
};

export default Customer;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
