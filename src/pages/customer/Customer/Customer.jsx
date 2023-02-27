import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
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

import {useMutation, useQueryClient} from 'react-query';

import instance from 'shared/axios';

import {exelUserAtom} from 'utils/store';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';

import {sendFinal} from './CustomerLogics';

import TableCustom from 'common/Table/TableCustom';
import usePagination from 'common/test/Pagination/usePagination';
import PaginationTest from './PaginationTest';
import Pagination from 'common/test/Pagination/Pagination';
import useCustomerData from './useCustomerData';

const Customer = () => {
  const [customerData, setCustomerData] = useAtom(CustomerDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');
  const [key, setKey] = useState([]);
  const [exelUser, setExelUser] = useAtom(exelUserAtom);
  const queryClient = useQueryClient();

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

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

  useEffect(() => {
    console.log(customerData);
  }, [customerData]);

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

  const handleDelete = () => {
    const status = {...checkboxStatus};

    let deleteList = [...tableDeleteList];

    Object.entries(status).forEach(v => {
      if (v[1] === true) {
        deleteList.push(v[0]);
      }
    });

    // console.log(deleteList);

    let yo = [];
    const customerDataToDelete = [...customerData];

    customerDataToDelete.forEach(v => {
      if (deleteList.includes(v.id.toString())) {
        v['isOnDeleteList'] = true;
        yo.push(v);
      } else {
        yo.push(v);
      }
    });

    setTableDeleteList(deleteList);
    setCustomerData(yo);
  };

  // 페이지네이션

  // 두 가지가 필요함

  // 1. 페이지네이션 처리가 된 Get Api
  // '현재 페이지'랑 '한 페이지당 보여줄 페이지의 갯수'
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
              {exelUser &&
                exelUser.map((p, i) => {
                  const HeaderData = Object.values(p);

                  if (i === 0) {
                    return (
                      <Table.Header key={'0' + i}>
                        <Table.Row>
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
                    return (
                      <Table.Body key={i}>
                        <Table.Row>
                          {key &&
                            key.map((k, l) => {
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
          {customerData && (
            <div>
              <CRUDBundle
                handleBundleClick={handleBundleClick}
                showRegister={showRegister}
                sendFinal={() => {
                  sendFinal(customerData, sendFinalMutate, checkboxStatus);
                }}
                sendDelete={handleDelete}
                checkboxStatus={checkboxStatus}
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
          )}

          {/* <div>
            <Pagination
              pageList={totalPageArray}
              lastPage={totalPageByLimit}
              selectOptionArray={[1, 2, 4, 10]}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          </div> */}

          <TableWrapper>
            {customerData && customerData.length > 0 && (
              <TableCustom
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
