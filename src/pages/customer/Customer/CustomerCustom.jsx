import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom, userCheckAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import Register from 'common/CRUD/Register/Register';
import {PageWrapper, TableWrapper} from '../../../style/common.style';
import {CustomerDataAtom} from './store';
import {
  exelUserAtom,
  groupIdAtom,
  userIdAtom,
  userPageAtom,
  userStateAtom,
} from 'utils/store';
import {Button, Pagination, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import useCustomerQuery from './useCustomerQuery';
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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useAtom(userPageAtom);
  const userStatus = userOption && `&userStatus=${userOption}`;
  const groupId = spotOption && `&group=${spotOption}`;
  const userId = nameOption && `&userId=${nameOption}`;
  // console.log(customerData, '9999');
  const params = {
    userStatus: userStatus && userStatus,
    groupId: groupId && groupId,
    userId: userId && userId,
  };

  const {deleteMutate, submitMutate, editMutate} = useMutate(CustomerDataAtom);

  const token = localStorage.getItem('token');
  const {} = useCustomerQuery(
    ['getCustomerJSON'],
    CustomerDataAtom,
    `users/all?${params.userStatus}${params.groupId}${params.userId}&page=${page}&limit=100`,
    token,
  );

  const handleClose = () => {
    setShowRegister(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (exelUser) setKey(Object.keys(exelUser[0]));
  }, [exelUser]);

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

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
                        return {...v, status: 0};
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
            <CostomerTable
              testData={customerData}
              setTestData={setCustomerData}
              userCheck={userCheck}
              setUserCheck={setUserCheck}
              allChk={allChk}
              setAllChk={setAllChk}
            />
            <PaginationWrap>
              <Pagination
                defaultActivePage={page}
                totalPages={totalPage}
                boundaryRange={1}
                onPageChange={(e, data) => {
                  setPage(data.activePage);
                }}
                onClick={scrollToTop}
              />
            </PaginationWrap>
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

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
