import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
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

import {exelUserAtom} from 'utils/store';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';

import {handleCustomerDelete, sendFinal} from './CustomerLogics';

import TableCustom from 'common/Table/TableCustom';

import useCustomerQuery from './useCustomerQuery';
import {
  CustomerFieldsDataForRegister,
  CustomerFieldsToOpen,
} from './CustomerInfoData';

const Customer = () => {
  const [customerData, setCustomerData] = useAtom(CustomerDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');
  const [key, setKey] = useState([]);
  const [exelUser, setExelUser] = useAtom(exelUserAtom);

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

  const {deleteMutate, submitMutate, editMutate} = useMutate(CustomerDataAtom);

  const token = localStorage.getItem('token');

  const {sendFinalMutate, deleteFinalMutate} = useCustomerQuery(
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
      setTableDeleteList([]);
    };
  }, []);

  const handleDelete = () => {
    handleCustomerDelete(
      checkboxStatus,
      tableDeleteList,
      customerData,
      setTableDeleteList,
      setCustomerData,
    );
  };

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
                  sendFinal(
                    customerData,
                    sendFinalMutate,
                    checkboxStatus,
                    tableDeleteList,
                    deleteFinalMutate,
                  );
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
                  fieldsData={CustomerFieldsDataForRegister}
                />
              )}
            </div>
          )}

          <TableWrapper>
            {customerData && customerData.length > 0 && (
              <TableCustom
                fieldsInput={CustomerFieldsToOpen}
                dataInput={customerData}
                ellipsisList={[
                  {key: 'password', length: '5rem'},
                  {key: 'email', length: '22rem'},
                ]}
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
