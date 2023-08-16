import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import Select from 'react-select';
import {TableWrapper} from 'style/common.style';

import {useState} from 'react';
import ReviewTableModal from '../ReviewModal/ReviewTableModal';

const ReviewTable = ({testData}) => {
  const [showModal, setShowModal] = useState(false);

  const [selectedId, setSelectedId] = useState(undefined);

  const handleRowClick = row => {
    setSelectedId(row.reviewId);

    setShowModal(true);
  };

  //값 확인하기

  return (
    <>
      <TableWrapper>
        {/* 모달 */}
        {showModal && (
          <ReviewTableModal
            open={showModal}
            setOpen={setShowModal}
            reviewId={selectedId}
          />
        )}

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                서비스 날짜
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품명</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">점수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">회사명</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">작성자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">작성날짜</Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                내용
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                사장님 답글 여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                운영자 답글 여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">신고</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">삭제여부</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {testData?.length > 0 &&
              testData?.map((row, i) => {
                console.log(row);
                return (
                  <Table.Row
                    style={{
                      cursor: 'pointer',
                    }}
                    key={row.reviewId}
                    onClick={e => {
                      e.stopPropagation();
                      handleRowClick(row);

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
                      <FlexBox>{row.orderCode}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.itemName}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.satisfaction}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.group}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.writer}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.createdDate}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <ContentFlexBox>{row.content}</ContentFlexBox> */}
                      <FlexBox>
                        <Content>{row.content}</Content>
                      </FlexBox>
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
                      <IsDeleteFlexBox>
                        {row.isDelete ? '삭제' : ''}
                      </IsDeleteFlexBox>
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

const IsDeleteFlexBox = styled(FlexBox)`
  color: red;
`;

const Content = styled.div`
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
