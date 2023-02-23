import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import {makeInitialInput} from 'common/CRUD/Register/logics/RegisterLogics';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';

import {TableCheckboxStatusAtom} from 'common/Table/store';

import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';

import {exelSpotAtom} from 'utils/store';

import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {checkedValue, idsToDelete, numberOfTrues} from '../Logics/Logics';
import {SpotInfoFieldsData, SpotInfoFieldsToOpen} from './SpotInfoData';

import {SpotInfoDataAtom} from './store';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import CustomTable from '../../../common/Table/CustomTable';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';
import styled from 'styled-components';

import useSpotInfoData from './useSpotInfoData';

const SpotInfo = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [spotInfoData] = useAtom(SpotInfoDataAtom);
  const [plan, setPlan] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});

  const [registerStatus, setRegisterStatus] = useState('register');

  const {deleteMutate, submitMutate, editMutate} = useMutate(SpotInfoDataAtom);

  // const {status, isLoading} = useSpotInfoQuery();
  const {status, isLoading} = useSpotInfoData(
    ['getSpotInfoJSON'],
    SpotInfoDataAtom,
    `clients/spot/all`,
    // `${process.env.REACT_APP_JSON_SERVER}/spot-info`,
    localStorage.getItem('token'),
  );

  const handleBundleClick = buttonStatus => {
    numberOfTrues({...checkboxStatus});

    if (buttonStatus === 'register') {
      setDataToEdit(makeInitialInput(SpotInfoFieldsToOpen));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    } else if (buttonStatus === 'edit') {
      if (numberOfTrues({...checkboxStatus}) === 0) {
        window.confirm(
          "아래의 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues({...checkboxStatus}) !== 1) {
        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues({...checkboxStatus}) === 1) {
        setDataToEdit(checkedValue(checkboxStatus, spotInfoData));
        setRegisterStatus(buttonStatus);
        setShowRegister(true);
      }
    } else if (buttonStatus === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 리스트중에 체크박스를 눌러 수정할 리스트를 '하나만' 선택해주세요.",
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
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
    };
  }, []);

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
              <CustomTable
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
