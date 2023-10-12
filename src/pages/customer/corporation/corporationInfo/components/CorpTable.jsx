/* eslint-disable react-hooks/exhaustive-deps */
import {Label, Pagination, Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import Select from 'react-select';

import {useEffect, useState} from 'react';
import {phoneNumberFormmatter} from '../../../../../utils/phoneNumberFormatter';
import withCommas from 'utils/withCommas';
import {groupTypeFormatted} from 'utils/statusFormatter';
import CorpEditModal from './CorpEditModal';
import {useGetCorporationInfoDetail} from 'hooks/useCorporation';
const defaultPrepaid = [
  {
    code: 1,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 2,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 3,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 4,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 5,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 6,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 7,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 8,
    count: null,
    price: null,
    totalPrice: null,
  },
  {
    code: 9,
    count: null,
    price: null,
    totalPrice: null,
  },
];
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
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [clickData, setClickData] = useState();
  const [clickId, setClickId] = useState();
  const showEditOpen = id => {
    setClickId(id);
    corpListData.filter(v => v.id === id);
    // setClickData(...datas);
  };
  const {data: corpDetail, refetch: refetchDetail} =
    useGetCorporationInfoDetail(clickId);
  // const diningType = corpListData?.map(el => {
  //   return el.diningTypes.map(v => {
  //     const type = v === 1 ? '아침' : v === 2 ? '점심' : '저녁';
  //     return type;
  //   });
  // });
  // console.log(diningType, '896');
  useEffect(() => {
    if (isSuccess) {
      setTotalPage(data?.data?.total);
    }
  }, [data?.data?.total, isSuccess]);
  useEffect(() => {
    if (clickId) {
      refetchDetail();
    }
  }, [clickId, refetchDetail]);
  useEffect(() => {
    if (clickId) {
      const data = defaultPrepaid.map((v)=>{
        const match = corpDetail?.data?.prepaidCategoryList && corpDetail?.data?.prepaidCategoryList?.length > 0 &&corpDetail?.data?.prepaidCategoryList.find((s)=> s.code === v.code);
        if(match){
          return match
        }
        return v
      })
      console.log(data)
      setClickData({
        ...corpDetail?.data,
        prepaidCategoryList: data
      });
      setShowOpenModal(true);
      setClickId();
    }
  }, [corpDetail]);

  // useEffect(() => {
  //   refetch();
  // }, [page, refetch, name, nameOption, setNameOption]);
  return (
    <div>
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
        <Label content="기업코드 미 입력시 아파트로 저장됩니다." color="red" />
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
              <Table.HeaderCell textAlign="center">활성 여부</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기업코드</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 150}}>이름</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 280}}>기본주소</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 150}}>상세주소</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">위치</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송비조건</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문요일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                주문마감시간
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                멤버십마감시간
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                아침 지원금
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                점심 지원금
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                저녁 지원금
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 요일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">담당자 ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                담당자 <br /> 전화번호
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                기업멤버십 <br />
                지원여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                멤버십 종료 날짜
              </Table.HeaderCell>

              <Table.HeaderCell textAlign="center">사원수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                식사 세팅 지원 <br />
                서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                샐러드 필요 유무
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                쓰레기 수거 <br />
                서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                온장고 대여 <br />
                서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                최소 구매 가능 금액
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                최대 구매 가능 금액
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {corpListData?.map((el, idx) => {
              const diningType = el.diningTypes.map(v =>
                v === 1 ? '아침' : v === 2 ? '점심' : '저녁',
              );
              const membership = el.isMembershipSupport ? '지원' : '미지원';
              const setting = el.isSetting ? '사용' : '미사용';
              const saladRequired = el.isSaladRequired ? '필요' : '불필요';
              const garbage = el.isGarbage ? '사용' : '미사용';
              const isActive = el.isActive ? '활성' : '비활성';
              const hotStorage = el.isHotStorage ? '사용' : '미사용';
              const morningData = el.mealInfos.find(
                morning => morning.diningType === 1,
              );
              const lunchData = el.mealInfos.find(
                morning => morning.diningType === 2,
              );
              const dinnerData = el.mealInfos.find(
                morning => morning.diningType === 3,
              );
              return (
                <Table.Row
                  key={el.id + idx}
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(el.id);
                  }}>
                  <Table.Cell>
                    <input type="checkbox" />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.id}</Table.Cell>
                  <Table.Cell textAlign="center">{isActive}</Table.Cell>
                  <Table.Cell style={{whiteSpace:'nowrap'}}>{groupTypeFormatted(el.groupType)}</Table.Cell>
                  <Table.Cell>{el.code}</Table.Cell>
                  <Table.Cell>{el.name}</Table.Cell>
                  <Table.Cell>{el.zipCode}</Table.Cell>
                  <Table.Cell>{el.address1}</Table.Cell>
                  <Table.Cell>{el.address2}</Table.Cell>
                  <Table.Cell>
                    <div
                      style={{
                        width: 'auto',
                      }}>
                      {el.location}
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.deliveryFeeOption}</Table.Cell>
                  <Table.Cell>
                    <div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {morningData?.serviceDays &&
                          '아침: ' + morningData?.serviceDays}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          marginBottom: 10,
                          marginTop: 10,
                        }}>
                        {lunchData?.serviceDays &&
                          '점심: ' + lunchData?.serviceDays}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {dinnerData?.serviceDays &&
                          '저녁: ' + dinnerData?.serviceDays}
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {morningData?.deliveryTimes &&
                          '아침: ' + morningData?.deliveryTimes}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          marginBottom: 10,
                          marginTop: 10,
                          whiteSpace: 'nowrap',
                        }}>
                        {lunchData?.deliveryTimes &&
                          '점심: ' + lunchData?.deliveryTimes}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {dinnerData?.deliveryTimes &&
                          '저녁: ' + dinnerData?.deliveryTimes}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {morningData?.lastOrderTime &&
                          '아침: ' + morningData?.lastOrderTime}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          marginBottom: 10,
                          marginTop: 10,
                          whiteSpace: 'nowrap',
                        }}>
                        {lunchData?.lastOrderTime &&
                          '점심: ' + lunchData?.lastOrderTime}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {dinnerData?.lastOrderTime &&
                          '저녁: ' + dinnerData?.lastOrderTime}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {morningData?.membershipBenefitTime &&
                          '아침: ' + morningData?.membershipBenefitTime}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          marginBottom: 10,
                          marginTop: 10,
                          whiteSpace: 'nowrap',
                        }}>
                        {lunchData?.membershipBenefitTime &&
                          '점심: ' + lunchData?.membershipBenefitTime}
                      </div>
                      <div
                        style={{
                          width: 'auto',
                          height: 15,
                          whiteSpace: 'nowrap',
                        }}>
                        {dinnerData?.membershipBenefitTime &&
                          '저녁: ' + dinnerData?.membershipBenefitTime}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {morningData?.supportPriceByDays &&
                      morningData?.supportPriceByDays?.map(data => {
                        return (
                          <div
                            key={el.id + data.serviceDay + data.supportPrice}
                            style={{
                              width: 'auto',
                              height: 15,
                              marginTop: 5,
                              whiteSpace: 'nowrap',
                            }}>
                            {data?.serviceDay &&
                              data?.serviceDay +
                                ': ' +
                                withCommas(data?.supportPrice)}
                          </div>
                        );
                      })}
                  </Table.Cell>
                  <Table.Cell>
                    {lunchData?.supportPriceByDays &&
                      lunchData?.supportPriceByDays?.map(data => {
                        return (
                          <div
                            key={el.id + data.serviceDay + data.supportPrice}
                            style={{
                              width: 'auto',
                              height: 15,
                              marginTop: 5,
                              whiteSpace: 'nowrap',
                            }}>
                            {data?.serviceDay &&
                              data?.serviceDay +
                                ': ' +
                                withCommas(data?.supportPrice)}
                          </div>
                        );
                      })}
                  </Table.Cell>
                  <Table.Cell>
                    {dinnerData?.supportPriceByDays &&
                      dinnerData?.supportPriceByDays?.map(data => {
                        return (
                          <div
                            key={el.id + data.serviceDay + data.supportPrice}
                            style={{
                              width: 'auto',
                              height: 15,
                              marginTop: 5,
                              whiteSpace: 'nowrap',
                            }}>
                            {data?.serviceDay &&
                              data?.serviceDay +
                                ': ' +
                                withCommas(data?.supportPrice)}
                          </div>
                        );
                      })}
                  </Table.Cell>

                  <Table.Cell>{diningType.join(',')}</Table.Cell>

                  <Table.Cell>
                    <div style={{width: 120}}>{el.serviceDays}</div>
                  </Table.Cell>

                  <Table.Cell textAlign="center">{el.managerId}</Table.Cell>
                  <Table.Cell>{el.managerName}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <div style={{width: 150}}>
                      {phoneNumberFormmatter(el.managerPhone)}
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{membership}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.membershipEndDate}
                  </Table.Cell>
                  <Table.Cell>{withCommas(el.employeeCount)}</Table.Cell>
                  <Table.Cell textAlign="center">{saladRequired}</Table.Cell>
                  <Table.Cell textAlign="center">{setting}</Table.Cell>
                  <Table.Cell textAlign="center">{garbage}</Table.Cell>
                  <Table.Cell textAlign="center">{hotStorage}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.minimumSpend || 0}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.maximumSpend || 0}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        {clickData && (
          <CorpEditModal
            open={showOpenModal}
            refetch={refetch}
            setOpen={setShowOpenModal}
            nowData={clickData}
            setNowData={setClickData}
            setClickId={setClickId}
            testData={corpListData}
          />
        )}
      </TableWrapper>
    </div>
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

