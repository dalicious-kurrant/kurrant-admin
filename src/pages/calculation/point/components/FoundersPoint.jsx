import {useGetFoundersPointPolicy, useGetPointPolicy} from 'hooks/usePoint';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';

const ReviewPoint = () => {
  const {data: point} = useGetFoundersPointPolicy();
  console.log(point)
  return (
    <TableWrapper
    //   style={{
    //     justifyContent: 'center',
    //     display: 'flex',
    //   }}
    >
      <TableWrap>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">타입명</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">MIN 포인트</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">MAX 포인트</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {point?.data?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">{el.value}</Table.Cell>
                  <Table.Cell textAlign="center">{el.minPoint}p</Table.Cell>
                  <Table.Cell textAlign="center">{el.maxPoint}p</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrap>
    </TableWrapper>
  );
};

export default ReviewPoint;

const TableWrap = styled.div`
  width: 85%;
  margin-top: 24px;
`;
