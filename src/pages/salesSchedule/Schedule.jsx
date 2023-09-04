import {useRef, useState} from 'react';
import {Button, Header, Table} from 'semantic-ui-react';
import styled, {css} from 'styled-components';
import {TableWrapper} from '../../style/common.style';
import {
  formattedWeekDate,
  formattedWeekDateTime,
} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';
import {useGetMakersList} from '../../hooks/useOrderList';
import {useGetSalesList} from '../../hooks/useSalesList';
import withCommas from 'utils/withCommas';
import {groupTypeFormatted} from 'utils/statusFormatter';

const Schedule = () => {
  const makersRef = useRef(null);
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);
  const [makersOption, setMakersOption] = useState('');
  const {data: makersList} = useGetMakersList();

  const types =
    diningSelect &&
    diningSelect.map(el => {
      if (el === 0) {
        return 1;
      }
      if (el === 1) {
        return 2;
      }
      if (el === 2) {
        return 3;
      }
      return el;
    });
  const {data: salesList, refetch} = useGetSalesList(
    startDate,
    endDate,
    types,
    makersOption,
  );

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const loadButton = () => {
    refetch();
  };
  const totalFood = salesList?.data?.totalFoods;

  const totalCount = totalFood
    ?.map(el => el.totalFoodCount)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  const makersArr = makersList?.data?.map(el => {
    return {
      value: el.makersId,
      label: el.makersName,
    };
  });
  const spotContentsText = (text1, text2) => {
    return (
      <ContentsDetailLabelWrap>
        <ContentsDetailLabel>{text1} :</ContentsDetailLabel>
        <ContentsDetailLabel2>{text2}</ContentsDetailLabel2>
      </ContentsDetailLabelWrap>
    );
  };

  return (
    <Wrapper>
      <Header as="h2">기간별 판매 내역</Header>
      <div>
        <SelectBox
          ref={makersRef}
          options={makersArr}
          placeholder="메이커스 선택"
          onChange={e => {
            setMakersOption(e.value);
          }}
        />
      </div>
      <CalendarWrap>
        <div>
          <DateInput
            type="date"
            defaultValue={startDate}
            onChange={e => getStartDate(e)}
          />
          <DateSpan>-</DateSpan>
          <DateInput
            type="date"
            defaultValue={endDate}
            onChange={e => getEndDate(e)}
          />
        </div>
        <ButtonWrap>
          <Button content="조회하기" basic size="tiny" onClick={loadButton} />
        </ButtonWrap>
      </CalendarWrap>
      <DiningButton touch={diningSelect} setTouch={setDiningSelect} />

      <TableWrapper>
        <TopTable>
          <TotalTable>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">상품명</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    상품상세정보
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    합계(개)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {salesList?.data?.totalFoods?.map((el, i) => {
                  return (
                    <Table.Row key={el.foodName + i}>
                      <Table.Cell>
                        {' '}
                        <FoodName>{el.foodName}</FoodName>
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Description>{el.description}</Description>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.totalFoodCount}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}

                <Table.Row>
                  <Table.Cell style={{borderTop: 'double black'}}>
                    <BoldText>Total</BoldText>
                  </Table.Cell>
                  <Table.Cell style={{borderTop: 'double black'}}></Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{borderTop: 'double black'}}>
                    <BoldText>{totalCount}</BoldText>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TotalTable>
          <DetailTable>
            {salesList?.data?.foodByDateDiningTypes?.map((el, i) => {
              const test = totalFood.map(s => {
                return el.foods.filter(v => v.foodId === s.foodId)[0];
              });
              return (
                <div key={el.serviceDate + el.diningType + i}>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={{whiteSpace: 'nowrap'}}>
                          {el.serviceDate + `\u00A0` + el.diningType}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {test.map((v, i) => {
                        if (v) {
                          return (
                            <Table.Row key={el.serviceDate + v.foodId}>
                              <Table.Cell textAlign="center">
                                {v.foodCount}
                              </Table.Cell>
                            </Table.Row>
                          );
                        }
                        return (
                          <Table.Row key={i}>
                            <Table.Cell>{`\u00A0`}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                      <Table.Row key={el.diningType + el.serviceDate}>
                        <Table.Cell
                          textAlign="center"
                          style={{borderTop: ' double black'}}>
                          <BoldText>{el.totalCount}</BoldText>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              );
            })}
          </DetailTable>
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        {salesList?.data?.deliveryGroupsByDates.map((el, idx) => {
          return (
            <MakersTable key={idx}>
              <ServiceDateContainer>
                <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
                <DeadLineBox
                  status={
                    new Date(el.lastOrderTime).getTime() < new Date().getTime()
                  }>
                  {new Date(el.lastOrderTime).getTime() < new Date().getTime()
                    ? '주문마감'
                    : '주문진행중'}
                </DeadLineBox>
                <DeadLineText>
                  주문 마감 {formattedWeekDateTime(new Date(el.lastOrderTime))}
                </DeadLineText>
              </ServiceDateContainer>
              <DateLine />
              <DiningTypeWrap>
                <MealDetailWrap>
                  {el.deliveryGroups.map((v, index) => {
                    const deliveryCount = v.foodBySpots?.length || 0;
                    return (
                      <MealDetail key={index}>
                        <TimeWrapContainer>
                          <TimeWrap>
                            <TimeBox>
                              픽업 시간
                              <TimeBoxTime>{v.pickUpTime}</TimeBoxTime>
                            </TimeBox>
                            <TimeBox>
                              총 배송 건수
                              <TimeBoxTime>{deliveryCount}개</TimeBoxTime>
                            </TimeBox>
                          </TimeWrap>
                          <TotalFoodWrap>
                            {v.foods.map(f => {
                              return (
                                <TotalFoodItems key={f.foodId}>
                                  <FoodItemName>{f.foodName}</FoodItemName>
                                  <FoodCount>{f.foodCount} 개</FoodCount>
                                </TotalFoodItems>
                              );
                            })}
                            <TotalFoodCount>
                              총 {withCommas(v.foodCount)} 개
                            </TotalFoodCount>
                          </TotalFoodWrap>
                        </TimeWrapContainer>

                        <MealDetailTimeWrap>
                          {v.foodBySpots.map((spot, i) => {
                            return (
                              <TableWrap key={i}>
                                <TableBox>
                                  <LabelWrap>
                                    <SpotLabel spot={spot.spotType}>
                                      {groupTypeFormatted(spot.spotType)}
                                    </SpotLabel>
                                    <TitleIdLabel
                                      spot={
                                        spot.spotType
                                      }>{`배송 번호: ${spot.deliveryId} `}</TitleIdLabel>
                                    {spot.deliveryTime &&
                                      spotContentsText(
                                        '도착 시간',
                                        spot.deliveryTime,
                                      )}
                                    {spot.address1 &&
                                      spotContentsText('도로명', spot.address1)}
                                    {spot.address2 &&
                                      spotContentsText('지번', spot.address2)}
                                    {spot.groupName &&
                                      spotContentsText(
                                        '스팟명',
                                        spot.groupName,
                                      )}
                                    {spot.spotName &&
                                      spotContentsText(
                                        '배송스팟명',
                                        spot.spotName,
                                      )}
                                    {spot.userName &&
                                      spotContentsText(
                                        '유저이름',
                                        spot.userName,
                                      )}
                                    {spot.phone &&
                                      spotContentsText('전화번호', spot.phone)}
                                  </LabelWrap>
                                  <Line />
                                  {spot.foods.map((food, index) => {
                                    return (
                                      <TotalFoodItems2 key={food.foodId}>
                                        <FoodItemName2>
                                          {food.foodName}
                                        </FoodItemName2>
                                        <FoodCount2>
                                          {food.foodCount} 개
                                        </FoodCount2>
                                      </TotalFoodItems2>
                                    );
                                  })}
                                  <TotalSpotFoodItem>
                                    <FoodItemName2>총 수량</FoodItemName2>
                                    <FoodCount2>
                                      {withCommas(spot.foodCount)} 개
                                    </FoodCount2>
                                  </TotalSpotFoodItem>
                                </TableBox>
                              </TableWrap>
                            );
                          })}
                        </MealDetailTimeWrap>
                      </MealDetail>
                    );
                  })}
                </MealDetailWrap>
              </DiningTypeWrap>
            </MakersTable>
          );
        })}
      </TableWrapper>
    </Wrapper>
  );
};

export default Schedule;

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  min-width: 1024px;
`;
const SelectBox = styled(Select)`
  width: 250px;
`;
const ServiceDateContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DeadLineBox = styled.div`
  background-color: #eee;
  color: ${({theme, status}) =>
    status ? theme.colors.red[500] : theme.colors.blue[500]};
  font-size: 13px;
  font-weight: 600;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 10px;
  margin-left: 10px;
`;
const DeadLineText = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-left: 10px;
`;
const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #bdbac1;
`;
const TotalFoodItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;
const FoodItemName = styled.div`
  max-width: 150px;
`;
const FoodCount = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const TotalFoodItems2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 400;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const TotalSpotFoodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding-top: 12px;
`;
const FoodItemName2 = styled.div`
  max-width: 215px;
`;
const FoodCount2 = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const Line = styled.div`
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 16px;
  margin-bottom: 12px;
  width: 100%;
`;
const TotalFoodCount = styled.div`
  font-weight: 400;
  align-self: flex-end;
  font-size: 13px;
`;
const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
`;

const TopTable = styled.div`
  margin-top: 50px;
  display: flex;
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div``;

const DetailTable = styled.div`
  overflow-x: auto;
  display: flex;
`;

const MealDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const MealDetail = styled.div`
  display: flex;
  margin-top: 20px;
`;
const MealDetailTimeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  gap: 40px;
`;

const DiningTypeWrap = styled.div`
  display: flex;
  margin-top: 24px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const ButtonWrap = styled.div`
  margin-left: 10px;
`;

const TableWrap = styled.div`
  display: flex;
  max-width: 306px;
  padding: 24px;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
`;
const TimeWrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard';
  min-width: 207px;
  margin-right: 48px;
`;
const TimeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Pretendard';
  min-width: 207px;
`;
const TotalFoodWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 24px;
  background-color: #f5f5f5;
  gap: 8px;
`;
const TimeBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  align-items: flex-start;
  flex-direction: column;
`;
const TimeBoxTime = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-weight: 600;
  margin-top: 4px;
  font-size: 20px;
`;
const BoldText = styled.span`
  font-weight: 700;
`;

const DateLine = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[5]};
`;

const LabelWrap = styled.div`
  min-width: 250px;
`;
const SpotLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  padding: 2px 4px;
  letter-spacing: -0.5px;
  border-radius: 4px;
  ${({spot, theme}) => {
    if (spot === 0)
      return css`
        color: ${theme.colors.blue[500]};
        background-color: ${theme.colors.blue[100]};
      `;
    return css`
      color: ${theme.colors.pink[500]};
      background-color: ${theme.colors.pink[100]};
    `;
  }}
`;
const TitleIdLabel = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 600;

  color: ${({spot, theme}) =>
    spot === 0 ? theme.colors.blue[500] : theme.colors.pink[500]};
`;
const ContentsDetailLabel = styled.div`
  display: flex;
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabel2 = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabelWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const FoodName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;
const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
`;

const TableBox = styled.div`
  margin-right: 10px;
  margin-top: 12px;
`;
