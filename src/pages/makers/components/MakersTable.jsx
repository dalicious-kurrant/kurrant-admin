import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import {formattedPercent} from '../../../utils/numberFormatter';
import {useEffect, useState} from 'react';
import MakersEditModal from './MakersEditModal';
import {diningFormatted} from 'utils/statusFormatter';
import { useEditEvent } from 'hooks/usePoint';

const MakersTable = ({data, setData}) => {
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [clickData, setClickData] = useState();
  const showEditOpen = id => {
    const datas = data?.data?.find(v => v.id === id);
    setClickData(datas);
    // console.log(datas)
    setSelectedImages(datas.introImages);
    setShowOpenModal(true);
  };
  useEffect(()=>{
    if(!showOpenModal) setClickData();

  },[showOpenModal])
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">활성 여부</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              메이커스 코드
            </Table.HeaderCell>

            <Table.HeaderCell textAlign="center">
              <div style={{width: 150}}>메이커스 이름</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 150}}>법인명</div>
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
            <Table.HeaderCell textAlign="center">영업 요일</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              가능 다이닝타입
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              아침 주문마감시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              점심 주문마감시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              저녁 주문마감시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              아침 가능케파
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              점심 가능케파
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              저녁 가능케파
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">아침 시작</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">점심 시작</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">저녁 시작</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">아침 종료</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">점심 종료</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">저녁 종료</Table.HeaderCell>
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
            <Table.HeaderCell textAlign="center">사용료</Table.HeaderCell>
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
            const isActive = el.isActive ? '활성' : '비활성';
            const morningDining = el.diningTypes.find(
              dining => dining.diningType === 1,
            );
            const lunchDining = el.diningTypes.find(
              dining => dining.diningType === 2,
            );
            const dinnerDining = el.diningTypes.find(
              dining => dining.diningType === 3,
            );
            return (
              <Table.Row
                key={el.id + i}
                style={{cursor: 'pointer'}}
                onClick={e => {
                  e.stopPropagation();
                  showEditOpen(el.id);
                }}>
                <Table.Cell textAlign="center">{el.id}</Table.Cell>
                <Table.Cell textAlign="center">{isActive}</Table.Cell>
                <Table.Cell textAlign="center">{el.code}</Table.Cell>
                <Table.Cell>{el.name}</Table.Cell>
                <Table.Cell>{el.companyName}</Table.Cell>
                <Table.Cell>{el.ceo}</Table.Cell>
                <Table.Cell textAlign="center">
                  <div style={{width: 150}}>{el.ceoPhone}</div>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.managerName ?? '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <div style={{width: 150}}>{el.managerPhone}</div>
                </Table.Cell>
                <Table.Cell textAlign="center">{el.dailyCapacity}</Table.Cell>
                <Table.Cell>
                  <div style={{width: 120}}>{el.serviceDays}</div>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.diningTypes
                    .map(dining => diningFormatted(dining.diningType))
                    .join(',')}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {morningDining?.lastOrderTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {lunchDining?.lastOrderTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {dinnerDining?.lastOrderTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {morningDining?.capacity || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {lunchDining?.capacity || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {dinnerDining?.capacity || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {morningDining?.minTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {lunchDining?.minTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {dinnerDining?.minTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {morningDining?.maxTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {lunchDining?.maxTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {dinnerDining?.maxTime || '-'}
                </Table.Cell>
                <Table.Cell textAlign="center">{el.serviceForm}</Table.Cell>
                <Table.Cell textAlign="center">{el.serviceType}</Table.Cell>
                <Table.Cell textAlign="center">{parentCompany}</Table.Cell>
                <Table.Cell textAlign="center">
                  {el.parentCompanyId ?? '-'}
                </Table.Cell>
                <Table.Cell>{el.zipCode}</Table.Cell>
                <Table.Cell>{el.address1}</Table.Cell>
                <Table.Cell>{el.address2}</Table.Cell>
                <Table.Cell textAlign="center">{el.location}</Table.Cell>
                <Table.Cell textAlign="center">
                  <div style={{width: 150}}>{el.companyRegistrationNumber}</div>
                </Table.Cell>
                <Table.Cell>{el.contractStartDate}</Table.Cell>
                <Table.Cell>{el.contractEndDate}</Table.Cell>
                <Table.Cell textAlign="center">
                  {el.isNutritionInformation ? '대상' : '비대상'}
                </Table.Cell>
                <Table.Cell>{el.openTime}</Table.Cell>
                <Table.Cell>{el.closeTime}</Table.Cell>
                <Table.Cell>{formattedPercent(el.fee)}</Table.Cell>
                <Table.Cell>{el.bank}</Table.Cell>
                <Table.Cell>{el.depositHolder}</Table.Cell>
                <Table.Cell>{el.accountNumber}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {clickData && (
        <MakersEditModal
          open={showOpenModal}
          setOpen={setShowOpenModal}
          nowData={clickData}
          setNowData={setClickData}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      )}
    </TableWrapper>
  );
};

export default MakersTable;
