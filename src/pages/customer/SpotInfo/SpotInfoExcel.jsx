import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
// import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
// import {planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import {BtnWrapper, PageWrapper, TableWrapper} from 'style/common.style';
import {exelSpotAtom, planAtom, spotAtom} from 'utils/store';
import useModal from 'hooks/useModal';
import useSpotInfoQuery from './useSpotInfoQuery';
import {spotInfoMockData} from 'data/spotInfo/spotInfoMockData';
import {spotInfoFields} from 'data/spotInfo/spotInfoData';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';

const SpotInfoExcel = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [plan, setPlan] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();

  const {
    data_getSpotInfoJSON,
    status_getSpotInfoJSON,
    isLoading_getSpotInfoJSON,
  } = useSpotInfoQuery();

  useEffect(() => {
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);

  useEffect(() => {
    const req = [];
    req.push(spotInfoFields);
    req.push(...spotInfoMockData);
    setPlan(req);
    // console.log(SpotInfoObjectSample);
  }, []);
  if (isLoading_getSpotInfoJSON)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status_getSpotInfoJSON === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <Container>
      <PageWrapper>
        <BtnWrapper>
          <Button color="red" content="삭제" icon="delete" onClick={onActive} />
        </BtnWrapper>
        <TableWrapper>
          <Table celled>
            {/* {console.log(plan)} */}
            {plan &&
              plan.map((p, i) => {
                const HeaderData = Object.values(p);

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
                            <Table.HeaderCell key={'0' + k}>
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
                                setChkData(chkData.filter(v => v.id !== p.id));
                              }
                            }}
                          />
                        </Table.Cell>
                        {key &&
                          key.map((k, l) => {
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
    </Container>
  );
};

export default SpotInfoExcel;

const Container = styled.section``;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
