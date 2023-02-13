import useModal from '../../hooks/useModal';
import React from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';

const Spot = () => {
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
              <Table.HeaderCell>스팟 이름</Table.HeaderCell>
              <Table.HeaderCell>그룹아이디</Table.HeaderCell>
              <Table.HeaderCell>우편번호</Table.HeaderCell>
              <Table.HeaderCell>기본주소</Table.HeaderCell>
              <Table.HeaderCell>상세주소</Table.HeaderCell>
              <Table.HeaderCell>위치</Table.HeaderCell>
              <Table.HeaderCell>식사타입</Table.HeaderCell>
              <Table.HeaderCell>생성일</Table.HeaderCell>
              <Table.HeaderCell>수정일</Table.HeaderCell>
              <Table.HeaderCell>배송시간아침</Table.HeaderCell>
              <Table.HeaderCell>주문요일아침</Table.HeaderCell>
              <Table.HeaderCell>지원금 아침</Table.HeaderCell>
              <Table.HeaderCell>배송시간점심</Table.HeaderCell>
              <Table.HeaderCell>주문요일점심</Table.HeaderCell>
              <Table.HeaderCell>지원금 점심</Table.HeaderCell>
              <Table.HeaderCell>배송시간저녁</Table.HeaderCell>
              <Table.HeaderCell>주문요일저녁</Table.HeaderCell>
              <Table.HeaderCell>지원금 저녁</Table.HeaderCell>
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

export default Spot;
