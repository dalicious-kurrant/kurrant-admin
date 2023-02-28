import useModal from '../../hooks/useModal';
import React from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';

// 메이커스 정보 페이지
const Makers = () => {
  return (
    <PageWrapper>
      <BtnWrapper></BtnWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell width={1} textAlign="center">
                <Checkbox />
              </Table.HeaderCell> */}
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>메이커스 코드</Table.HeaderCell>
              <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
              <Table.HeaderCell>법인명</Table.HeaderCell>
              <Table.HeaderCell>사업자대표</Table.HeaderCell>
              <Table.HeaderCell>대표자 전화번호</Table.HeaderCell>
              <Table.HeaderCell>담당자 이름</Table.HeaderCell>
              <Table.HeaderCell>담당자 전화번호</Table.HeaderCell>
              <Table.HeaderCell>일일최대수량</Table.HeaderCell>
              <Table.HeaderCell>서비스 업종</Table.HeaderCell>
              <Table.HeaderCell>서비스 형태</Table.HeaderCell>
              <Table.HeaderCell>모회사 여부</Table.HeaderCell>
              <Table.HeaderCell>모회사 ID</Table.HeaderCell>
              <Table.HeaderCell>우편번호</Table.HeaderCell>
              <Table.HeaderCell>기본주소</Table.HeaderCell>
              <Table.HeaderCell>상세주소</Table.HeaderCell>
              <Table.HeaderCell>위치</Table.HeaderCell>
              <Table.HeaderCell>사업자 등록번호</Table.HeaderCell>
              <Table.HeaderCell>계약 시작날짜</Table.HeaderCell>
              <Table.HeaderCell>계약 종료날짜</Table.HeaderCell>
              <Table.HeaderCell>외식영양정보 표시 대상 여부</Table.HeaderCell>
              <Table.HeaderCell>영업 시작시간</Table.HeaderCell>
              <Table.HeaderCell>영업 종료시간</Table.HeaderCell>
              <Table.HeaderCell>은행</Table.HeaderCell>
              <Table.HeaderCell>예금주 명</Table.HeaderCell>
              <Table.HeaderCell>계좌번호</Table.HeaderCell>
              <Table.HeaderCell>생성일</Table.HeaderCell>
              <Table.HeaderCell>수정일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              {/* <Table.Cell textAlign="center">
                <Checkbox />
              </Table.Cell> */}
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

export default Makers;
