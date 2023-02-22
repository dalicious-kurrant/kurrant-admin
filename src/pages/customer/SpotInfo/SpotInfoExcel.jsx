import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';

import {useAtom} from 'jotai';
import {BtnWrapper, PageWrapper, TableWrapper} from 'style/common.style';
import {planAtom} from 'utils/store';
import useModal from 'hooks/useModal';
import useSpotInfoQuery from './useSpotInfoQuery';
import {SpotInfoObjectSample} from 'data/spotInfo/spotInfoMockData';

const SpotInfoExcel = () => {
  const {onActive} = useModal();
  const [plan, setPlan] = useAtom(planAtom);
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
    setPlan(SpotInfoObjectSample);
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
    </Container>
  );
};

export default SpotInfoExcel;

const Container = styled.section``;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
