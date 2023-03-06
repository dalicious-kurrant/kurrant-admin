import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';
import {
  dataHasNoIdAtom,
  TableCheckboxStatusAtom,
  TableDeleteListAtom,
} from 'common/Table/store';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {exelSpotAtom, spotAtom} from 'utils/store';
import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {
  SpotInfoFieldsData,
  SpotInfoFieldsToOpen,
  SpotInfoRegisterFieldsToOpen,
} from './SpotInfoData';
import {clickButtonBundle} from '../Logics/Logics';
import {SpotInfoDataAtom} from './store';
import {Button, Checkbox, Table} from 'semantic-ui-react';

import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import styled from 'styled-components';
import useSpotInfoQuery from './useSpotInfoQuery';
import {handleSpotInfoDelete, sendFinal} from './SpotInfoLogics';
import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';
import TableCustom from 'common/Table/TableCustom';
import useSpotInfoMutate from './useSpotInfoMutate';

const SpotInfo = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();

  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  // const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);
  const [registerStatus, setRegisterStatus] = useState('register');

  const [, setImportExelSpot] = useAtom(spotAtom);

  const {submitMutate, editMutate} = useSpotInfoMutate(SpotInfoDataAtom);

  const {status, isLoading, sendFinalMutate, deleteFinalMutate} =
    useSpotInfoQuery(
      ['getSpotInfoJSON'],
      [SpotInfoDataAtom, spotAtom],
      // status의 활성 '1', 비활성'0'이있는데, 일단 활성만 받아오게 함
      `clients/spot/all?status=1`,
      // `${process.env.REACT_APP_JSON_SERVER}/spot-info`,
      localStorage.getItem('token'),
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
    );
  };

  const handleClose = () => {
    setShowRegister(false);
  };
  useEffect(() => {
    if (exelSpot) setKey(Object.keys(exelSpot[0]));
  }, [exelSpot]);

  useEffect(() => {
    // setSpotInfoData()
    console.log(spotInfoData);
    setImportExelSpot(spotInfoData);
  }, [spotInfoData]);

  useEffect(() => {
    console.log(exelSpot);
  }, [exelSpot]);

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

  const handleDelete = () => {
    console.log('delete');

    // 삭제할 값들의 id골라내기

    let deleteIdArray = [];
    let spotInfoList = [...spotInfoData];

    Object.entries(checkboxStatus).forEach(v => {
      if (v[1] === true) {
        // console.log(v[0]);

        const deleteData = spotInfoList.find(val => val.id === parseInt(v[0]));
        // console.log(deleteData);
        deleteIdArray.push(deleteData.spotId);
      }
    });

    console.log(deleteIdArray);

    if (window.confirm(`${deleteIdArray.toString()}를 삭제하시겠습니까?`)) {
      deleteFinalMutate(deleteIdArray);
    } else {
      return;
    }
  };

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
      {exelSpot ? (
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
              {exelSpot &&
                exelSpot.map((p, i) => {
                  const HeaderData = Object.values(p);

                  if (i === 0) {
                    // console.log(HeaderData, '123');
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
                    // console.log(p);
                    return (
                      <Table.Body key={i}>
                        <Table.Row>
                          <Table.Cell textAlign="center">
                            <Checkbox
                              checked={chkData.includes(p.spotId)}
                              onChange={(v, data) => {
                                if (data.checked) {
                                  setChkData([...chkData, p.spotId]);
                                } else {
                                  setChkData(
                                    chkData.filter(v => v.spotId !== p.spotId),
                                  );
                                }
                              }}
                            />
                          </Table.Cell>
                          {key &&
                            key.map((k, l) => {
                              // console.log(p[k], 'test');
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
                                        : p[k]}
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
            <CRUDBundle
              handleBundleClick={handleBundleClick}
              showRegister={showRegister}
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
                fieldsToOpen={SpotInfoRegisterFieldsToOpen}
                fieldsData={SpotInfoFieldsData}
              />
            )}
          </div>

          <TableWrapper>
            {!!spotInfoData && spotInfoData.length !== 0 && (
              <TableCustom
                fieldsInput={SpotInfoFieldsToOpen}
                dataInput={spotInfoData}
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
