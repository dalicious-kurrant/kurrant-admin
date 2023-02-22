import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import {makeInitialInput} from 'common/CRUD/Register/logics/RegisterLogics';
import Register from 'common/CRUD/Register/Register';

import {TableCheckboxStatusAtom} from 'common/Table/store';
import Table from 'common/Table/Table';

import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';

import {useLocation} from 'react-router';
import {exelSpotAtom} from 'utils/store';

import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {SpotInfoFieldsData, SpotInfoFieldsToOpen} from './SpotInfoData';
import {checkedValue, idsToDelete, numberOfTrues} from './SpotInfoLogics';
import {SpotInfoDataAtom} from './store';
import useMutate from './useMutate';
import useSpotInfoQuery from './useSpotInfoQuery';
import {Button, Checkbox} from 'semantic-ui-react';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import styled from 'styled-components';

const SpotInfo = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [spotInfoData] = useAtom(SpotInfoDataAtom);
  const [plan, setPlan] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});

  const [registerStatus, setRegisterStatus] = useState('register');

  const {status, isLoading} = useSpotInfoQuery();

  const {deleteMutate, submitMutate, editMutate} = useMutate();

  const handleBundleClick = buttonStatus => {
    numberOfTrues({...checkboxStatus});

    if (buttonStatus === 'register') {
      setDataToEdit(makeInitialInput([...spotInfoData][0]));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    } else if (buttonStatus === 'edit') {
      if (numberOfTrues({...checkboxStatus}) === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues({...checkboxStatus}) !== 1) {
        // console.log(numberOfTrues({...checkboxStatus}));

        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues({...checkboxStatus}) === 1) {
        setDataToEdit(checkedValue(checkboxStatus, spotInfoData));
        setRegisterStatus(buttonStatus);
        setShowRegister(true);
      }
    } else if (buttonStatus === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
        return;
      }

      if (window.confirm('삭제하시겠습니까?')) {
        idsToDelete({...checkboxStatus}).forEach(value => {
          deleteMutate(value);
        });
      } else {
        return;
      }
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };
  useEffect(() => {
    if (plan) console.log(plan);
  }, [plan]);

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
                  console.log(HeaderData, '123');
                  if (i === 0) {
                    return (
                      <Table.Header key={'0' + i}>
                        <Table.Row>
                          {/* <Table.HeaderCell>체크박스</Table.HeaderCell> */}
                          <Table.HeaderCell width={1} textAlign="center">
                            <Checkbox />
                          </Table.HeaderCell>
                          {HeaderData.map((h, k) => {
                            return (
                              <Table.HeaderCell
                                key={'0' + h.lunchDailySupportPrice + k}>
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
                                    <FlexBox>{formattedTime(p[k])}</FlexBox>
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
            {/* {isCRUDAvaliable(pathname) && (
          
        )} */}
            <CRUDBundle
              handleBundleClick={handleBundleClick}
              showRegister={showRegister}
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
            {!!spotInfoData && spotInfoData.length !== 0 && (
              <Table
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
