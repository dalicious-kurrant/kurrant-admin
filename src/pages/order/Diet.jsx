import useModal from '../../hooks/useModal';
import React from 'react';
import {Button, Table, Checkbox} from 'semantic-ui-react';
import {PageWrapper, BtnWrapper, TableWrapper} from '../../style/common.style';

// 식단 정보 페이지
const Diet = () => {
  const {onActive} = useModal();

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>그룹이름</Table.HeaderCell>
              <Table.HeaderCell>스팟이름</Table.HeaderCell>
              <Table.HeaderCell>식사타입</Table.HeaderCell>
              <Table.HeaderCell>배송날짜</Table.HeaderCell>
              <Table.HeaderCell>배송시간</Table.HeaderCell>
              <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
              <Table.HeaderCell>상품아이디</Table.HeaderCell>
              <Table.HeaderCell>상품이름</Table.HeaderCell>
              <Table.HeaderCell>남은 주문 가능 수량</Table.HeaderCell>
              <Table.HeaderCell>최대 음식 공급 수량</Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">
                <Checkbox />
              </Table.Cell>
              <Table.Cell>13</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
};

export default Diet;
