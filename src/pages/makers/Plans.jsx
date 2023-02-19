import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';

// 메이커스 정보 페이지
const Plans = () => {
  const {onActive} = useModal();
  const [plan] = useAtom(planAtom);
  const [key, setKey] = useState();
  useEffect(() => {
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);
  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        <Table celled>
          {plan &&
            plan.map((p, i) => {
              const HeaderData = Object.values(p);
              if (i === 0) {
                return (
                  <Table.Header key={p + i}>
                    <Table.Row>
                      {HeaderData.map((h, i) => {
                        return (
                          <Table.HeaderCell key={h + i}>{h}</Table.HeaderCell>
                        );
                      })}
                    </Table.Row>
                  </Table.Header>
                );
              } else {
                return (
                  <Table.Body key={p + i}>
                    <Table.Row>
                      {key &&
                        key.map((k, i) => {
                          return (
                            <Table.Cell key={k + i}>
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
  );
};

export default Plans;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
