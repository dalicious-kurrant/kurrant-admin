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
import {SpotInfoDataAtom, SpotInfoGroupIdNameAtom} from './store';
import {Button, Checkbox, Table} from 'semantic-ui-react';

import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import styled from 'styled-components';
import useSpotInfoQuery from './useSpotInfoQuery';
import {
  clickSpotInfoButtonBundle,
  handleSpotInfoDelete,
  sendFinal,
} from './SpotInfoLogics';
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

  const [groupIdNameData] = useAtom(SpotInfoGroupIdNameAtom);
  const [spotInfoAddedFieldsData, setSpotInfoAddedFieldsData] = useState([]);

  const [dataToEdit, setDataToEdit] = useState({});

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
    clickSpotInfoButtonBundle(
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
    setImportExelSpot(spotInfoData);
  }, [spotInfoData]);

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
        // console.log(deleteData);s
        deleteIdArray.push(deleteData.spotId);
      }
    });

    if (window.confirm(`${deleteIdArray.toString()}를 삭제하시겠습니까?`)) {
      deleteFinalMutate(deleteIdArray);
    } else {
      return;
    }
  };

  useEffect(() => {
    // spotInfo 는 서버에서 받은groupId, groupName을 넣어줘야한다

    const injectGroupIDNameDataOnGroupId = SpotInfoFieldsData.map(v => {
      if (v.fieldName === 'groupId') {
        v.options = [...groupIdNameData];
      }
      return v;
    });

    setSpotInfoAddedFieldsData(injectGroupIDNameDataOnGroupId);
  }, [groupIdNameData]);

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
              {exelSpot &&
                exelSpot.map((p, i) => {
                  const HeaderData = Object.values(p);

                  if (i === 0) {
                    return (
                      <Table.Header key={'0' + i}>
                        <Table.Row>
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
                fieldsData={spotInfoAddedFieldsData}
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
