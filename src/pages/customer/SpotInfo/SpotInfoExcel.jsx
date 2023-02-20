import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
// import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
// import {planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import {BtnWrapper, PageWrapper, TableWrapper} from 'style/common.style';
import {planAtom} from 'utils/store';
import useModal from 'hooks/useModal';

const SpotInfoExcel = () => {
  const {onActive} = useModal();
  const [plan] = useAtom(planAtom);
  const [key, setKey] = useState();
  useEffect(() => {
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);
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
