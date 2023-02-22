import {useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';
import {useGetMakersList} from '../../hooks/useOrderList';
import {useGetSalesList} from '../../hooks/useSalesList';

const Schedule = () => {
  const makersRef = useRef(null);
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);
  const [makersOption, setMakersOption] = useState('');

  const {data: makersList} = useGetMakersList();
  console.log(makersOption, '2424');
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
  console.log(salesList);
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

  return (
    <PageWrapper>
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
                    합계(개)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {salesList?.data?.totalFoods?.map((el, i) => {
                  return (
                    <Table.Row key={el.foodName + i}>
                      <Table.Cell>{el.foodName}</Table.Cell>
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
            {salesList?.data?.foodByDateDiningTypes.map((el, i) => {
              const test = totalFood.map(s => {
                return el.foods.filter(v => v.foodId === s.foodId)[0];
              });
              return (
                <div>
                  <Table key={el.serviceDate + el.diningType + i}>
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
        {salesList?.data?.groupFoodByDateDiningTypes.map((el, idx) => (
          <MakersTable key={idx}>
            <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
            <DateLine />
            <DiningTypeWrap>
              <MealDetailWrap>
                {el.foodByGroups.map((v, index) => {
                  return (
                    <TableWrap key={index}>
                      {v.spotByDateDiningTypes.map((spot, i) => {
                        return (
                          <div key={i} style={{marginRight: 10}}>
                            <Label
                              content={v.groupName + `\u00A0` + spot.spotName}
                              color="green"
                            />
                            <Label content={spot.deliveryTime} color="black" />
                            <Table celled>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell textAlign="center">
                                    상품명
                                  </Table.HeaderCell>
                                  <Table.HeaderCell textAlign="center">
                                    수량
                                  </Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              {spot.foods.map((food, index) => {
                                return (
                                  <Table.Body key={index}>
                                    <Table.Row>
                                      <Table.Cell>{food.foodName}</Table.Cell>
                                      <Table.Cell textAlign="center">
                                        {food.foodCount}
                                      </Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                );
                              })}
                            </Table>
                          </div>
                        );
                      })}
                    </TableWrap>
                  );
                })}
              </MealDetailWrap>
            </DiningTypeWrap>
          </MakersTable>
        ))}
      </TableWrapper>
    </PageWrapper>
  );
};

export default Schedule;

const SelectBox = styled(Select)`
  width: 250px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #bdbac1;
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

const TotalTable = styled.div`
  /* margin-right: 10px; */
  width: 30%;
`;

const DetailTable = styled.div`
  overflow-x: auto;
  display: flex;
`;

const MealDetailWrap = styled.div`
  display: flex;
  margin-right: 24px;
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
  margin-right: 5px;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const DateLine = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[5]};
`;
