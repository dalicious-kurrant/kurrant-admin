import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';
import {dataHasNoIdAtom, TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {exelSpotAtom, spotAtom} from 'utils/store';
import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {SpotInfoFieldsData, SpotInfoFieldsToOpen} from './SpotInfoData';
import {clickButtonBundle} from '../Logics/Logics';
import {SpotInfoDataAtom} from './store';
import {Button, Checkbox, Table} from 'semantic-ui-react';

import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import styled from 'styled-components';
import useSpotInfoData from './useSpotInfoData';
import {sendFinal} from './SpotInfoLogics';
import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import TableCustom from 'common/Table/TableCustom';
import {removeIdToSend} from 'common/Table/Logics';

const SpotInfo = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);
  const [plan, setPlan] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});

  const [registerStatus, setRegisterStatus] = useState('register');

  const {deleteMutate, submitMutate, editMutate} = useMutate(SpotInfoDataAtom);

  const queryClient = useQueryClient();

  const [dataHasNoId, setDataHasNoId] = useAtom(dataHasNoIdAtom);

  const {status, isLoading} = useSpotInfoData(
    ['getSpotInfoJSON'],
    SpotInfoDataAtom,
    `clients/spot/all`,
    // `${process.env.REACT_APP_JSON_SERVER}/spot-info`,
    localStorage.getItem('token'),
  );
  useSpotInfoData(
    ['getSpot'],
    spotAtom,
    `clients/spot/all`,
    // `${process.env.REACT_APP_JSON_SERVER}/spot-info`,
    localStorage.getItem('token'),
  );

  const {mutate: sendFinalMutate} = useMutation(
    async todo => {
      const response = await instance.post(
        `users`,
        dataHasNoId ? removeIdToSend(todo) : todo,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');

        setDataHasNoId(false);

        queryClient.invalidateQueries(['getSpotInfoJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  const handleBundleClick = buttonStatus => {
    clickButtonBundle(
      buttonStatus,
      SpotInfoFieldsToOpen,
      spotInfoData,
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
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

  const handleDelete = () => {
    // console.log(deletedStatus);

    const status = {...checkboxStatus};

    let deleteList = [];

    Object.entries(status).forEach(v => {
      if (v[1] === true) {
        deleteList.push(v[0]);
      }
    });

    let yo = [];
    const spotInfoDataToDelete = [...spotInfoData];

    spotInfoDataToDelete.forEach(v => {
      if (deleteList.includes(v.id.toString())) {
      } else {
        yo.push(v);
      }
    });

    setSpotInfoData(yo);
  };

  // const sendFinal = () => {
  //   const oldData = [...customerData];

  //   const newData = oldData.map(value => {
  //     let yo = {};

  //     yo['userId'] = handleFalsyValue(value.email);
  //     yo['password'] = handleFalsyValue(value.password);
  //     yo['name'] = handleFalsyValue(value.name);
  //     yo['email'] = handleFalsyValue(value.email);
  //     yo['phone'] = handleFalsyValue(value.phone);
  //     yo['role'] = handleFalsyValue(value.role);

  //     return yo;
  //   });

  //   const newData2 = {
  //     userList: newData,
  //   };

  //   if (
  //     window.confirm(
  //       '테이블에 있는 데이터를 최종적으로 변경합니다 진행하시겠습니까?',
  //     )
  //   ) {
  //     sendFinalMutate(newData2);
  //   } else {
  //   }
  // };

  useEffect(() => {
    console.log(spotInfoData);
  }, [spotInfoData]);

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
    <>
      {plan ? (
        <PageWrapper>
          <BtnWrapper>
            <Button
              color="red"
              content="삭제"
              icon="delete"
              onClick={onActive}
            />
          </BtnWrapper>
          <TableWrapper>
            <Table celled>
              {/* {console.log(plan)} */}
              {plan &&
                plan.map((p, i) => {
                  const HeaderData = Object.values(p);

                  if (i === 0) {
                    console.log(HeaderData, '123');
                    return (
                      <Table.Header key={'0' + i}>
                        <Table.Row>
                          {/* <Table.HeaderCell>체크박스</Table.HeaderCell> */}
                          <Table.HeaderCell width={1} textAlign="center">
                            <Checkbox />
                          </Table.HeaderCell>
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
                          <Table.Cell textAlign="center">
                            <Checkbox
                              checked={chkData.includes(p.id)}
                              onChange={(v, data) => {
                                if (data.checked) {
                                  setChkData([...chkData, p.id]);
                                } else {
                                  setChkData(
                                    chkData.filter(v => v.id !== p.id),
                                  );
                                }
                              }}
                            />
                          </Table.Cell>
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
          <div>
            {/* {isCRUDAvaliable(pathname) && (
          
        )} */}
            <CRUDBundle
              handleBundleClick={handleBundleClick}
              showRegister={showRegister}
              sendFinal={() => {
                sendFinal(spotInfoData, sendFinalMutate);
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
                fieldsToOpen={SpotInfoFieldsToOpen}
                fieldsData={SpotInfoFieldsData}
              />
            )}
          </div>

          <TableWrapper>
            {/* {!!spotInfoData && spotInfoData.length !== 0 && (
              <CustomTable
                fieldsInput={SpotInfoFieldsToOpen}
                dataInput={spotInfoData}
                // isMemo={true}
                // handleChange={}
              />
            )} */}
            {!!spotInfoData && spotInfoData.length !== 0 && (
              <TableCustom
                fieldsInput={SpotInfoFieldsToOpen}
                dataInput={spotInfoData}

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

export default SpotInfo;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
