import {Pagination, Table, TableRow} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import Select from 'react-select';

import {useEffect, useState} from 'react';
import {formattedDate} from 'utils/dateFormatter';

const CorpTable = ({
  data,
  isSuccess,
  refetch,
  setPage,
  page,
  name,
  nameOption,
  setNameOption,
}) => {
  const [totalPage, setTotalPage] = useState(0);

  const corpListData = data?.data?.items?.groupInfoList;
  const nameFilter = data?.data?.items?.groupIdList.map(el => {
    return {
      value: el.groupId,
      label: el.groupName,
    };
  });

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(data?.data?.total);
    }
  }, [data?.data?.total, isSuccess]);

  // useEffect(() => {
  //   refetch();
  // }, [page, refetch, name, nameOption, setNameOption]);
  return (
    <PageWrapper>
      <SelectBoxWrapper>
        <div>
          <span>이름 필터</span>
          <SelectBox
            placeholder="이름 필터"
            options={nameFilter}
            onChange={e => setNameOption(e.value)}
          />
        </div>
      </SelectBoxWrapper>
      <PaginationWrap>
        <Pagination
          totalPages={totalPage}
          defaultActivePage={page}
          onPageChange={(e, data) => {
            setPage(data.activePage);
          }}
        />
      </PaginationWrap>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <input type="checkbox" />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                그룹 <br />
                ID
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기업코드</Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                이름
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기본주소</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상세주소</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">위치</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 요일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                담당자 <br /> 전화번호
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                기업멤버십 <br />
                지원여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사원수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                식사 세팅 지원 <br />
                서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                쓰레기 수거 <br />
                서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                온장고 대여 <br />
                서비스
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {corpListData?.map((el, idx) => {
              const diningType =
                el.diningTypes === 1
                  ? '아침'
                  : el.diningTypes === 2
                  ? '점심'
                  : '저녁';
              const membership = el.isMembershipSupport ? '지원' : '미지원';
              const setting = el.isSetting ? '사용' : '미사용';
              const garbage = el.isGarbage ? '사용' : '미사용';
              const hotStorage = el.isHotStorage ? '사용' : '미사용';
              return (
                <Table.Row key={el.id + idx}>
                  <Table.Cell>
                    <input type="checkbox" />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.id}</Table.Cell>
                  <Table.Cell>{el.code}</Table.Cell>
                  <Table.Cell>{el.name}</Table.Cell>
                  <Table.Cell>{el.zipCode}</Table.Cell>
                  <Table.Cell>{el.address1}</Table.Cell>
                  <Table.Cell>{el.address2}</Table.Cell>
                  <Table.Cell>{el.location}</Table.Cell>
                  <Table.Cell>{diningType}</Table.Cell>
                  <Table.Cell>{el.serviceDays.split('').join(',')}</Table.Cell>
                  <Table.Cell>{el.managerName}</Table.Cell>
                  <Table.Cell>{el.managerPhone}</Table.Cell>
                  <Table.Cell textAlign="center">{membership}</Table.Cell>
                  <Table.Cell>{el.employeeCount}</Table.Cell>
                  <Table.Cell textAlign="center">{setting}</Table.Cell>
                  <Table.Cell textAlign="center">{garbage}</Table.Cell>
                  <Table.Cell textAlign="center">{hotStorage}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
};

export default CorpTable;

const SelectBoxWrapper = styled.div`
  display: flex;
  margin: 24px 0px 0px 0px;
  width: 80%;
  justify-content: space-between;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-top: 4px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;