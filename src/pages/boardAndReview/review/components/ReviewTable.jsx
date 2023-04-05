import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import Select from 'react-select';
import {TableWrapper} from 'style/common.style';
import {userStatusFormatted} from 'utils/statusFormatter';
import {formattedFullDate, formattedWeekDate} from 'utils/dateFormatter';

const ReviewTable = ({
  testData,
  setTestData,
  userCheck,
  setUserCheck,
  allChk,
  setAllChk,
}) => {
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
                    key={`${row.email}`}
                    onClick={e => {
                      e.stopPropagation();
                      //   showEditOpen(row.id);
                    }}>
                    <Table.Cell
                      style={{cursor: 'auto'}}
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <FlexBox>
                        {/* <Checkbox
                          checked={userCheck.includes(row.id) || allChk}
                          onChange={(e, data) => {
                            if (data.checked) {
                              setUserCheck([...userCheck, row.id]);
                            } else {
                              setUserCheck(userCheck.filter(v => v !== row.id));
                            }
                          }}
                        /> */}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{userStatusFormatted(row.status)}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.email}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexPwdBox>{row.password}</FlexPwdBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.userName}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.role}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.phone}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.groupName}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.point}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.gourmetType}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isMembership ? 'O' : 'X'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.marketingAlarm ? 'O' : 'X'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.marketingAgreedDateTime
                          ? formattedWeekDate(row.marketingAgreedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.marketingAgreed}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.userOrderAlarm}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.recentLoginDateTime
                          ? formattedFullDate(row.recentLoginDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.userCreatedDateTime
                          ? formattedFullDate(row.userCreatedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.userUpdatedDateTime
                          ? formattedFullDate(row.userUpdatedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.generalEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.kakaoEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.naverEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.facebookEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.appleEmail || '-'}</FlexBox>
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
