import {useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';
import {useGetMakersList} from '../../hooks/useOrderList';
import {useGetSalesList} from '../../hooks/useSalesList';
const deliveryGroupsByDates = {
  deliveryGroupsByDates: [
    {
      serviceDate: '2023-05-23',
      diningType: '점심',
      spotCount: 8,
      deliveryGroups: [
        {
          deliveryTime: '12:00',
          spotCount: 8,
          foods: [
            {
              foodId: 729,
              foodCount: 2,
              foodName: '[BULK UP] Big Burger SET',
            },
            {
              foodId: 730,
              foodCount: 11,
              foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
            },
            {
              foodId: 734,
              foodCount: 13,
              foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
            },
          ],
          foodCount: 26,
          foodBySpots: [
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              foods: [
                {
                  foodId: 730,
                  foodCount: 1,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 4,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 5,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '달리셔스',
              groupName: '달리셔스',
              foods: [
                {
                  foodId: 730,
                  foodCount: 3,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 4,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '유빔빌딩 3F',
              groupName: '세이클',
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 730,
                  foodCount: 6,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 3,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 10,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 730,
                  foodCount: 1,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 3,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
          ],
        },
      ],
    },
    {
      serviceDate: '2023-05-24',
      diningType: '점심',
      spotCount: 14,
      deliveryGroups: [
        {
          deliveryTime: '12:00',
          spotCount: 12,
          foods: [
            {
              foodId: 729,
              foodCount: 6,
              foodName: '[BULK UP] Big Burger SET',
            },
            {
              foodId: 731,
              foodCount: 17,
              foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
            },
            {
              foodId: 735,
              foodCount: 21,
              foodName:
                '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
            },
          ],
          foodCount: 44,
          foodBySpots: [
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              foods: [
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: 'MJC 빌딩 5F',
              groupName: '도미네이트',
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              foods: [
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              foods: [
                {
                  foodId: 729,
                  foodCount: 2,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 3,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 6,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '위워크 선릉2호점 5F',
              groupName: '데이터독',
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 5,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 5,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 11,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              foods: [
                {
                  foodId: 729,
                  foodCount: 2,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 4,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 6,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 12,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '섬유센터 13F',
              groupName: '벤처블릭 코리아',
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 3,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '달리셔스',
              groupName: '달리셔스',
              foods: [
                {
                  foodId: 731,
                  foodCount: 2,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: '대시모빌리티',
              groupName: '대시모빌리티',
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              pickUpTime: '11:20',
              spotName: 'MJC 빌딩 5F',
              groupName: '브랜드리팩터링',
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
              ],
              foodCount: 1,
            },
          ],
        },
        {
          deliveryTime: '13:00',
          spotCount: 2,
          foods: [
            {
              foodId: 731,
              foodCount: 1,
              foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
            },
            {
              foodId: 735,
              foodCount: 2,
              foodName:
                '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
            },
          ],
          foodCount: 3,
          foodBySpots: [
            {
              deliveryId: null,
              pickUpTime: '12:20',
              spotName: '은혜빌딩 지하1층',
              groupName: '뷰티셀렉션 (은혜빌딩)',
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              pickUpTime: '12:20',
              spotName: '아이타워 6F',
              groupName: '뷰티셀렉션 (아이타워)',
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
          ],
        },
      ],
    },
  ],
  totalFoods: [
    {
      foodId: 729,
      description:
        '(ABT)Total Calories 920_ Protein 32(g) / Carb 26(g) / Fat 11(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n기름기가 적은 소고기와 돼지고기부위를 1:1 비율로 소금과 후추만 들어간 순수 미트패티 와 구운버터감자',
      totalFoodCount: 8,
      foodName: '[BULK UP] Big Burger SET',
    },
    {
      foodId: 730,
      description:
        '(ABT)Total Calories 940_ Protein 36(g) / Carb 43(g) / Fat 9(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n그릴에 구운 스테이크와 구운 고구마와 샤워크림 ',
      totalFoodCount: 11,
      foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
    },
    {
      foodId: 731,
      description:
        '(ABT)Total Calories 860_ Protein 32(g) / Carb 32 (g) / Fat 11(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n스파이시한 닭가슴살 슬라이스와 타코샐러드 & 과콰몰리 & 또르띠아',
      totalFoodCount: 18,
      foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
    },
    {
      foodId: 734,
      description:
        'Total Calories 380_ Protein 32(g) / Carb 30(g) / Fat 6(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n그릴에 구운 틸라피아 생선과 백미와 자스민쌀 1:1 비율로 포만감이 좋고, 칼로리는 낮음',
      totalFoodCount: 13,
      foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
    },
    {
      foodId: 735,
      description:
        'Total Calories 430 _ Protein 36(g) / Carb 30(g) / Fat 9(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n수비드하게 익힌 부채살과 약간의 버터를 겻들인 매쉬드포테이토 + 삶은채소와 아몬드',
      totalFoodCount: 23,
      foodName: '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
    },
  ],
  foodByDateDiningTypes: [
    {
      serviceDate: '2023-05-23',
      diningType: '점심',
      totalCount: 26,
      foods: [
        {
          foodId: 729,
          foodCount: 2,
          foodName: '[BULK UP] Big Burger SET',
        },
        {
          foodId: 730,
          foodCount: 11,
          foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
        },
        {
          foodId: 734,
          foodCount: 13,
          foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
        },
      ],
    },
    {
      serviceDate: '2023-05-24',
      diningType: '점심',
      totalCount: 47,
      foods: [
        {
          foodId: 729,
          foodCount: 6,
          foodName: '[BULK UP] Big Burger SET',
        },
        {
          foodId: 731,
          foodCount: 18,
          foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
        },
        {
          foodId: 735,
          foodCount: 23,
          foodName:
            '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
        },
      ],
    },
  ],
};
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
            {salesList?.data?.foodByDateDiningTypes.map((el, i) => {
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
        {deliveryGroupsByDates.deliveryGroupsByDates.map((el, idx) => {
          const spotTotal = el.spotCount;
          return (
            <MakersTable key={idx}>
              <BoldText>
                {el.serviceDate + `\u00A0` + el.diningType} ( {spotTotal}개 상세
                스팟)
              </BoldText>
              <DateLine />
              <DiningTypeWrap>
                <MealDetailWrap>
                  {el.deliveryGroups.map((v, index) => {
                    const deliveryCount = v.foodBySpots?.length || 0;
                    return (
                      <MealDetail key={index}>
                        <TimeWrap>
                          <TimeBox>
                            배송 시간{' '}
                            <TimeBoxTime>({v.deliveryTime})</TimeBoxTime>
                          </TimeBox>
                          <TimeBox>
                            총 배송지{' '}
                            <TimeBoxTime>({deliveryCount}개)</TimeBoxTime>
                          </TimeBox>
                        </TimeWrap>
                        <TimeWrap2>
                          <Table celled>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell textAlign="center">
                                  상품명
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">
                                  총 수량
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {v.foods.map(f => {
                                return (
                                  <Table.Row key={f.foodId}>
                                    <Table.Cell style={{maxWidth: 300}}>
                                      {f.foodName}
                                    </Table.Cell>
                                    <Table.Cell>{f.foodCount}</Table.Cell>
                                  </Table.Row>
                                );
                              })}
                              <Table.Row
                                style={{
                                  backgroundColor: '#efefef',
                                  fontWeight: 600,
                                }}>
                                <Table.Cell style={{maxWidth: 600}}>
                                  합계
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  {v.foodCount}
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </TimeWrap2>
                        <MealDetailTimeWrap>
                          {v.foodBySpots.map((spot, i) => {
                            let foodTotalCount = 0;
                            return (
                              <TableWrap key={i}>
                                <TableBox>
                                  <LabelWrap>
                                    <div>
                                      <Label
                                        content={`배송 ID: ${spot.deliveryId} `}
                                        color="blue"
                                      />
                                    </div>
                                    <div>
                                      <Label
                                        content={`예상 픽업 시간: ${spot.pickUpTime} `}
                                        color="black"
                                      />
                                    </div>
                                    <div style={{marginTop: 4}}>
                                      <Label
                                        content={`배송지: ${spot.spotName} `}
                                        color="blue"
                                      />
                                    </div>
                                    <div style={{marginTop: 4}}>
                                      <Label
                                        content={spot.groupName}
                                        color="green"
                                      />
                                    </div>
                                  </LabelWrap>
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
                                    <Table.Body>
                                      {spot.foods.map((food, index) => {
                                        foodTotalCount =
                                          foodTotalCount + food.foodCount;
                                        return (
                                          <Table.Row
                                            key={
                                              spot.spotId +
                                              spot.spotName +
                                              food.foodName +
                                              index +
                                              i +
                                              idx
                                            }>
                                            <Table.Cell>
                                              <div style={{width: 150}}>
                                                {food.foodName}
                                              </div>
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">
                                              <div style={{width: 50}}>
                                                {food.foodCount}
                                              </div>
                                            </Table.Cell>
                                          </Table.Row>
                                        );
                                      })}
                                      <Table.Row
                                        style={{
                                          backgroundColor: '#efefef',
                                          fontWeight: 600,
                                        }}>
                                        <Table.Cell>합계</Table.Cell>
                                        <Table.Cell textAlign="center">
                                          <div style={{width: 50}}>
                                            {foodTotalCount}
                                          </div>
                                        </Table.Cell>
                                      </Table.Row>
                                    </Table.Body>
                                  </Table>
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
`;
const TimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
`;
const TimeWrap2 = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 300px;
  max-width: 300px;
`;
const TimeBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 30px;
  align-items: flex-end;
`;
const TimeBoxTime = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 25px;
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
