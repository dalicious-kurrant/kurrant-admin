import {useGetPointPolicy} from 'hooks/usePoint';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';

const ReviewPoint = () => {
  const {data: point} = useGetPointPolicy();

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
              <Table.HeaderCell textAlign="center">최소값</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">최대값</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">일반리뷰</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사진리뷰</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {point?.data?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">{el.minPrice}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.maxPrice || '~'}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.contentPoint}p</Table.Cell>
                  <Table.Cell textAlign="center">{el.imagePoint}p</Table.Cell>
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
