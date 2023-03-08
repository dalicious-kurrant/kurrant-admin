import useMutate from 'common/CRUD/useMutate';
import {
  TableCheckboxStatusAtom,
  TableDeleteListAtom,
  userCheckAtom,
} from 'common/Table/store';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import {clickButtonBundle} from '../Logics/Logics';
// import {CustomerFieldsData, CustomerFieldsToOpen} from './CustomerInfoData';
import {PageWrapper, TableWrapper} from '../../../style/common.style';

import {CustomerDataAtom} from './store';

import {useMutation, useQueryClient} from 'react-query';

import instance from 'shared/axios';

import {
  exelUserAtom,
  groupIdAtom,
  uerIdAtom,
  userIdAtom,
  userStateAtom,
} from 'utils/store';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedFullDate, formattedWeekDate} from 'utils/dateFormatter';

import useCustomerQuery from './useCustomerQuery';

import {sendFinal} from './CustomerLogics';

// import useCustomerData from './useCustomerData';
import {
  CustomerFieldsDataForRegister,
  CustomerFieldsToOpen,
} from './CustomerInfoData';
import CostomerTable from './CustomerTable';
import {userStatusFormatted} from 'utils/statusFormatter';

const CustomerCustom = () => {
  const [customerData, setCustomerData] = useAtom(CustomerDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [allChk, setAllChk] = useState(false);
  const [userCheck, setUserCheck] = useAtom(userCheckAtom);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');
  const [key, setKey] = useState([]);
  const [exelUser, setExelUser] = useAtom(exelUserAtom);

  const [userOption] = useAtom(userStateAtom);
  const [nameOption] = useAtom(userIdAtom);
  const [spotOption] = useAtom(groupIdAtom);

  const userStatus = userOption && `&userStatus=${userOption}`;
  const groupId = spotOption && `&groupId=${spotOption}`;
  const userId = nameOption && `&userId=${nameOption}`;
  // console.log(customerData, '9999');
  const params = {
    userStatus: userStatus && userStatus,
    groupId: groupId && groupId,
    userId: userId && userId,
  };

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

  // const {status, isLoading} = useCustomerData(
  //   ['getCustomerJSON'],
  //   CustomerDataAtom,
  //   'users/all',
  //   token,
  // );

  const {} = useCustomerQuery(
    ['getCustomerJSON'],
    CustomerDataAtom,
    `users/all?${params.userStatus}${params.groupId}${params.userId}`,
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

  const handleDelete = () => {
    const status = {...checkboxStatus};

    let deleteList = [...tableDeleteList];

    Object.entries(status).forEach(v => {
      if (v[1] === true) {
        deleteList.push(v[0]);
      }
    });

    deleteList = [...new Set(deleteList)];

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

  useEffect(() => {}, [userOption, nameOption, spotOption]);

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
                              if (k === 'marketingAgreedDateTime') {
                                console.log(p[k]);
                                return (
                                  <Table.Cell key={k + l}>
                                    <FlexBox>{p[k] || '-'}</FlexBox>
                                  </Table.Cell>
                                );
                              }
                              if (
                                k === 'userCreatedDateTime' ||
                                k === 'recentLoginDateTime' ||
                                k === 'userUpdatedDateTime'
                              ) {
                                return (
                                  <Table.Cell key={k + l}>
                                    <FlexBox>{p[k] ? p[k] : '-'}</FlexBox>
                                  </Table.Cell>
                                );
                              }
                              if (k === 'status') {
                                return (
                                  <Table.Cell key={`${i}` + l}>
                                    <FlexBox>
                                      {userStatusFormatted(p[k])}
                                    </FlexBox>
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
            <div style={{marginBottom: 30}}>
              <ButtonBox>
                <Button
                  basic
                  color="green"
                  onClick={() => setShowRegister(!showRegister)}>
                  {!showRegister ? '추가 열기' : '추가 닫기'}
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => {
                    const deleteData = customerData.map(v => {
                      if (userCheck.includes(v.id)) {
                        return {...v, status: 2};
                      }
                      return v;
                    });
                    setCustomerData(deleteData);
                    setUserCheck([]);
                    setAllChk(false);
                    console.log(deleteData);
                  }}>
                  탈퇴
                </Button>
                <Button
                  basic
                  color="blue"
                  onClick={() => {
                    const deleteData = customerData.map(v => {
                      if (userCheck.includes(v.id)) {
                        return {...v, status: 1};
                      }
                      return v;
                    });
                    setCustomerData(deleteData);
                    setUserCheck([]);
                    setAllChk(false);
                    console.log(deleteData);
                  }}>
                  활성
                </Button>
              </ButtonBox>
              {showRegister && (
                <Register
                  registerStatus={registerStatus}
                  submitMutate={submitMutate}
                  editMutate={editMutate}
                  handleClose={handleClose}
                  data={dataToEdit}
                  type="user"
                  fieldsToOpen={CustomerFieldsToOpen}
                  fieldsData={CustomerFieldsDataForRegister}
                />
              )}
            </div>
          )}

          <TableWrapper>
            {
              <CostomerTable
                testData={customerData}
                setTestData={setCustomerData}
                userCheck={userCheck}
                setUserCheck={setUserCheck}
                allChk={allChk}
                setAllChk={setAllChk}
              />
            }
          </TableWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export default CustomerCustom;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
