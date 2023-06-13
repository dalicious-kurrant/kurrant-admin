import {useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled, {css, useTheme} from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';
import {useGetMakersList} from '../../hooks/useOrderList';
import {useGetSalesList} from '../../hooks/useSalesList';
import withCommas from 'utils/withCommas';
import {groupTypeFormatted} from 'utils/statusFormatter';
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 534 글라스타워 17층',
              address2: '글라스타워 17층',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 테헤란로51길 21 3F 달리셔스',
              address2: '3F 달리셔스',
              spotName: '달리셔스',
              groupName: '달리셔스',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 영동대로 302 3층 4층',
              address2: '3층 4층',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 영동대로 302 3F 4F',
              address2: '3F 4F',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 학동로 230 유빔빌딩 3F',
              address2: '유빔빌딩 3F',
              spotName: '유빔빌딩 3F',
              groupName: '세이클',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 14층',
              address2: '연봉빌딩 14층',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 217 오렌지플레닛, 7층',
              address2: '오렌지플레닛, 7층',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 13층',
              address2: '연봉빌딩 13층',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 영동대로 302 3F 4F',
              address2: '3F 4F',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 영동대로 302 3층 4층',
              address2: '3층 4층',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 언주로 552 5층',
              address2: '5층',
              spotName: 'MJC 빌딩 5F',
              groupName: '도미네이트',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 217 오렌지플레닛, 7층',
              address2: '오렌지플레닛, 7층',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 14층',
              address2: '연봉빌딩 14층',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 427 5층 데이터독',
              address2: '5층 데이터독',
              spotName: '위워크 선릉2호점 5F',
              groupName: '데이터독',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 534 글라스타워 17층',
              address2: '글라스타워 17층',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 518 섬유센터 13층 137호',
              address2: '섬유센터 13층 137호',
              spotName: '섬유센터 13F',
              groupName: '벤처블릭 코리아',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 13층',
              address2: '연봉빌딩 13층',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 테헤란로51길 21 3F 달리셔스',
              address2: '3F 달리셔스',
              spotName: '달리셔스',
              groupName: '달리셔스',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로51길 21 3층 달리셔스',
              address2: '3층 달리셔스',
              spotName: '대시모빌리티',
              groupName: '대시모빌리티',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 언주로 552 5층',
              address2: '5층',
              spotName: 'MJC 빌딩 5F',
              groupName: '브랜드리팩터링',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '12:20',
              address1: '서울 강남구 봉은사로68길 31 지층 뷰티셀렉션',
              address2: '지층 뷰티셀렉션',
              spotName: '은혜빌딩 지하1층',
              groupName: '뷰티셀렉션 (은혜빌딩)',
              userName: null,
              phone: null,
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
              spotType: 0,
              pickUpTime: '12:20',
              address1: '서울 강남구 봉은사로 465 아이타워 6층',
              address2: '아이타워 6층',
              spotName: '아이타워 6F',
              groupName: '뷰티셀렉션 (아이타워)',
              userName: null,
              phone: null,
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
  const themeApp = useTheme();
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
  const totalFood = deliveryGroupsByDates?.totalFoods;

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
                {deliveryGroupsByDates?.totalFoods?.map((el, i) => {
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
            {deliveryGroupsByDates?.foodByDateDiningTypes?.map((el, i) => {
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
              <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
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
                              도착 완료 시간
                              <TimeBoxTime>{v.deliveryTime}</TimeBoxTime>
                            </TimeBox>
                            <TimeBox>
                              총 주문수량
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
                            let foodTotalCount = 0;
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
                                    {spot.pickUpTime &&
                                      spotContentsText(
                                        '예상 픽업',
                                        spot.pickUpTime,
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
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
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
