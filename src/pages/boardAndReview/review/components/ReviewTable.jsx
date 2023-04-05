import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import Select from 'react-select';
import {TableWrapper} from 'style/common.style';
import {userStatusFormatted} from 'utils/statusFormatter';
import {formattedFullDate, formattedWeekDate} from 'utils/dateFormatter';

const ReviewTable = ({testData}) => {
  return (
    <>
      <TableWrapper>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>서비스 날짜</Table.HeaderCell>
              <Table.HeaderCell>상품번호</Table.HeaderCell>
              <Table.HeaderCell>상품명</Table.HeaderCell>
              <Table.HeaderCell>점수</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>작성날짜</Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                내용
              </Table.HeaderCell>
              <Table.HeaderCell>사장님 답글 여부</Table.HeaderCell>
              <Table.HeaderCell>관리자 답글 여부</Table.HeaderCell>
              <Table.HeaderCell>신고</Table.HeaderCell>
              <Table.HeaderCell>삭제여부</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {testData?.length > 0 &&
              testData?.map((row, i) => {
                return (
                  <Table.Row
                    style={{
                      cursor: 'pointer',
                    }}
                    key={row.reviewId}
                    onClick={e => {
                      console.log('클릭됨 나중에 여기에 상세패이지 만들어야됨');
                      e.stopPropagation();
                      //   showEditOpen(row.id);
                    }}>
                    {/* <Table.Cell
                      style={{cursor: 'auto'}}
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <FlexBox></FlexBox>
                    </Table.Cell> */}
                    <Table.Cell>
                      <FlexBox>{row.serviceDate}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.orderItemId}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.itemName}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.satisfaction}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.writer}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.createdDate}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.content}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isMakersComment ? 'o' : 'x'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isAdminComment ? 'o' : 'x'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isReport ? 'o' : 'x'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isDelete ? 'o' : 'x'}</FlexBox>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </>
  );
};

export default ReviewTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const FlexPwdBox = styled.div`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DropdownBox = styled.div`
  width: 150px;
`;

const SelectWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-right: 50px;
`;
