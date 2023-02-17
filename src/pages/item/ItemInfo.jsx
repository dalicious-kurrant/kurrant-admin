import useModal from '../../hooks/useModal';
import React from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';

// 상품 정보 페이지
const ItemInfo = () => {
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
              <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
              <Table.HeaderCell>식품 이름</Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell>매장가격</Table.HeaderCell>
              <Table.HeaderCell>매장할인률</Table.HeaderCell>
              <Table.HeaderCell>이벤트할인률</Table.HeaderCell>
              <Table.HeaderCell>최종가격</Table.HeaderCell>
              <Table.HeaderCell>설명</Table.HeaderCell>
              <Table.HeaderCell>식사태그</Table.HeaderCell>
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
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
};

export default ItemInfo;
