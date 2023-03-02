import {useGetMakersInfomation} from '../../../hooks/useMakers';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';

const MakersTable = ({data}) => {
  //   const {data: makersInfoList} = useGetMakersInfomation();
  //   console.log(makersInfoList);
  console.log(data);
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>메이커스 코드</Table.HeaderCell>
            <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
            <Table.HeaderCell>법인명</Table.HeaderCell>
            <Table.HeaderCell>사업자대표</Table.HeaderCell>
            <Table.HeaderCell>대표자 전화번호</Table.HeaderCell>
            <Table.HeaderCell>담당자 이름</Table.HeaderCell>
            <Table.HeaderCell>담당자 전화번호</Table.HeaderCell>
            <Table.HeaderCell>일일최대수량</Table.HeaderCell>
            <Table.HeaderCell>가능 다이닝타입</Table.HeaderCell>
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
            <Table.HeaderCell>
              외식영양정보 <br />
              표시 대상 여부
            </Table.HeaderCell>
            <Table.HeaderCell>영업 시작시간</Table.HeaderCell>
            <Table.HeaderCell>영업 종료시간</Table.HeaderCell>
            <Table.HeaderCell>은행</Table.HeaderCell>
            <Table.HeaderCell>예금주 명</Table.HeaderCell>
            <Table.HeaderCell>계좌번호</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.data?.map((el, i) => {
            const parentCompany = el.isParentCompany ? '있음' : '없음';
            return (
              <Table.Row key={el.id + i}>
                <Table.Cell>{el.id}</Table.Cell>
                <Table.Cell>{el.code}</Table.Cell>
                <Table.Cell>{el.name}</Table.Cell>
                <Table.Cell>{el.companyName}</Table.Cell>
                <Table.Cell>{el.ceo}</Table.Cell>
                <Table.Cell>{el.ceoPhone}</Table.Cell>
                <Table.Cell>{el.managerName}</Table.Cell>
                <Table.Cell>{el.managerPhone}</Table.Cell>
                <Table.Cell>{el.dailyCapacity}</Table.Cell>
                <Table.Cell>{el.diningTypes.join(',')}</Table.Cell>
                <Table.Cell>{el.serviceType}</Table.Cell>
                <Table.Cell>{el.serviceForm}</Table.Cell>
                <Table.Cell>{parentCompany}</Table.Cell>
                <Table.Cell>{el.parentCompanyId}</Table.Cell>
                <Table.Cell>{el.zipCode}</Table.Cell>
                <Table.Cell>{el.address1}</Table.Cell>
                <Table.Cell>{el.address2}</Table.Cell>
                <Table.Cell>{el.location}</Table.Cell>
                <Table.Cell>{el.companyRegistrationNumber}</Table.Cell>
                <Table.Cell>{el.contractStartDate}</Table.Cell>
                <Table.Cell>{el.contractEndDate}</Table.Cell>
                <Table.Cell>{el.isNutritionInformation ?? '부'}</Table.Cell>
                <Table.Cell>{el.openTime}</Table.Cell>
                <Table.Cell>{el.closeTime}</Table.Cell>
                <Table.Cell>{el.bank}</Table.Cell>
                <Table.Cell>{el.depositHolder}</Table.Cell>
                <Table.Cell>{el.accountNumber}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};

export default MakersTable;
