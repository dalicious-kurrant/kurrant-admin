import {useGetMakersInfomation} from '../../../hooks/useMakers';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';

const MakersTable = ({data}) => {
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              메이커스 코드
            </Table.HeaderCell>

            <Table.HeaderCell textAlign="center">
              <div style={{width: 100}}>메이커스 이름</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 100}}>법인명</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">사업자대표</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              대표자 전화번호
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">담당자 이름</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              담당자 전화번호
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">일일최대수량</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              가능 다이닝타입
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">서비스 업종</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">서비스 형태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">모회사 여부</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">모회사 ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 200}}>기본주소</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 200}}>상세주소</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 100}}>위치</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              사업자 등록번호
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              계약 시작날짜
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              계약 종료날짜
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              외식영양정보 <br />
              표시 대상 여부
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              영업 시작시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              영업 종료시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">은행</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">예금주 명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 200}}>계좌번호</div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.data?.map((el, i) => {
            const parentCompany = el.isParentCompany ? '있음' : '없음';
            return (
              <Table.Row key={el.id + i}>
                <Table.Cell textAlign="center">{el.id}</Table.Cell>
                <Table.Cell textAlign="center">{el.code}</Table.Cell>
                <Table.Cell>{el.name}</Table.Cell>
                <Table.Cell>{el.companyName}</Table.Cell>
                <Table.Cell>{el.ceo}</Table.Cell>
                <Table.Cell>{el.ceoPhone}</Table.Cell>
                <Table.Cell>{el.managerName}</Table.Cell>
                <Table.Cell>{el.managerPhone}</Table.Cell>
                <Table.Cell textAlign="center">{el.dailyCapacity}</Table.Cell>
                <Table.Cell>{el.diningTypes.join(',')}</Table.Cell>
                <Table.Cell textAlign="center">{el.serviceType}</Table.Cell>
                <Table.Cell>{el.serviceForm}</Table.Cell>
                <Table.Cell textAlign="center">{parentCompany}</Table.Cell>
                <Table.Cell>{el.parentCompanyId}</Table.Cell>
                <Table.Cell>{el.zipCode}</Table.Cell>
                <Table.Cell>{el.address1}</Table.Cell>
                <Table.Cell>{el.address2}</Table.Cell>
                <Table.Cell>{el.location}</Table.Cell>
                <Table.Cell>{el.companyRegistrationNumber}</Table.Cell>
                <Table.Cell>{el.contractStartDate}</Table.Cell>
                <Table.Cell>{el.contractEndDate}</Table.Cell>
                <Table.Cell textAlign="center">
                  {el.isNutritionInformation ?? '부'}
                </Table.Cell>
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
