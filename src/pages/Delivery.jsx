import React, {useEffect} from 'react';

import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useState} from 'react';
import PublicSelectDatePicker from 'components/PublicSelectDatePicker';
import {Dropdown, Label} from 'semantic-ui-react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import useTitle from 'hooks/useTitle';

const optionsClient = [
  {key: '달리셔스', text: '달리셔스', value: '달리셔스'},
  {key: '이너스', text: '이너스', value: '이너스'},
  {key: '달리셔스1', text: '달리셔스1', value: '달리셔스1'},
  {key: '달리셔스2', text: '달리셔스2', value: '달리셔스2'},
];

const deliveryInfo = [
  {
    serviceDate: '2023-03-13',
    group: [
      {
        groupId: 1,
        groupName: '달리셔스',
        spotName: '3층',
        address: '여기',
        spotId: 1,
        deliveryTime: '12:00',
        makers: [
          {
            makersId: 1,
            makersName: '수미찬',
            pickupTime: '11:10',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
          {
            makersId: 2,
            makersName: '모모유부',
            pickupTime: '11:30',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
        ],
      },
      {
        groupId: 1,
        groupName: '달리셔스',
        spotName: '4층',
        spotId: 1,
        deliveryTime: '12:00',
        makers: [
          {
            makersId: 1,
            makersName: '수미찬',
            pickupTime: '11:10',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
          {
            makersId: 2,
            makersName: '모모유부',
            pickupTime: '11:30',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    serviceDate: '2023-03-14',
    group: [
      {
        groupId: 1,
        groupName: '달리셔스',
        deliveryTime: '12:00',
        makers: [
          {
            makersId: 1,
            makersName: '수미찬',
            pickupTime: '11:10',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
          {
            makersId: 2,
            makersName: '모모유부',
            pickupTime: '11:30',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
        ],
      },
      {
        groupId: 2,
        groupName: '뷰티컬렉션',
        deliveryTime: '12:00',
        makers: [
          {
            makersId: 1,
            makersName: '수미찬',
            pickupTime: '11:10',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
          {
            makersId: 2,
            makersName: '모모유부',
            pickupTime: '11:30',
            foods: [
              {
                foodName: '김치찌개',
                foodCount: 3,
              },
              {
                foodName: '된장찌개',
                foodCount: 12,
              },
              {
                foodName: '부침개',
                foodCount: 3,
              },
              {
                foodName: '오리샐러드',
                foodCount: 1,
              },
            ],
          },
        ],
      },
    ],
  },
];
const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;
const Delivery = () => {
  useTitle('배송정보 페이지');
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const [startDate, setStartDate] = useState(
    new Date(
      curr.getTime() + curr.getTimezoneOffset() * 60 * 1000 + KR_TIME_DIFF,
    ),
  );
  const [endDate, setEndDate] = useState(
    new Date(
      curr.getTime() + curr.getTimezoneOffset() * 60 * 1000 + KR_TIME_DIFF,
    ),
  );
  const [selectClient, setSelectClient] = useState([]);
  const [selectSpot, setSelectSpot] = useState([]);
  const {
    data: deliveryInfo,
    refetch: deliveryRefetch,
    isFetching: deliveryLoading,
  } = useQuery(['deliveryInfo'], async () => {
    let groupIds = '';
    let spotIds = '';
    if (selectClient.length > 0) {
      groupIds = `&groupIds=${selectClient.join(',')}`;
    }
    if (selectSpot.length > 0) {
      spotIds = `&spotIds=${selectSpot.join(',')}`;
    }
    return await axios.get(
      `${baseURL}/delivery?startDate=${formattedWeekDateZ(
        startDate,
      )}&endDate=${formattedWeekDateZ(endDate)}${groupIds}${spotIds}`,
    );
  });
  const [deliveryInfoList, setDeliveryInfoList] = useState([]);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [spotInfoList, setSpotInfoList] = useState([]);
  useEffect(() => {
    if (deliveryInfo) {
      setDeliveryInfoList(deliveryInfo?.data?.data?.deliveryInfoList);
      setGroupInfoList(
        deliveryInfo?.data?.data?.groupInfoList?.map(v => {
          return {key: v.groupId, text: v.groupName, value: v.groupId};
        }),
      );
      setSpotInfoList(
        deliveryInfo?.data?.data?.spotInfoList?.map(v => {
          return {
            key: v.spotId,
            text: v.spotId + '-' + v.spotName,
            value: v.spotId,
          };
        }),
      );
    }
  }, [deliveryInfo]);
  useEffect(() => {
    setDeliveryInfoList([]);
    deliveryRefetch();
  }, [startDate, endDate, selectClient, selectSpot, deliveryRefetch]);

  return (
    <Container>
      <HeadTitle>배송정보</HeadTitle>
      <DateSelectBox>
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date);
          }}
          dateFormat="yyyy-MM-dd"
          customInput={<PublicSelectDatePicker />}
        />
        ~
        <DatePicker
          selected={endDate}
          onChange={date => {
            setEndDate(date);
          }}
          dateFormat="yyyy-MM-dd"
          customInput={<PublicSelectDatePicker />}
        />
      </DateSelectBox>
      <FilterBox>
        <DropBox>
          <Label>스팟</Label>
          <Dropdown
            placeholder="스팟"
            fluid
            multiple
            selection
            search
            options={groupInfoList}
            value={selectClient}
            onChange={(e, data) => {
              setSelectClient(data.value);
            }}
          />
        </DropBox>
        <DropBox>
          <Label>상세 스팟</Label>
          <Dropdown
            placeholder="상세 스팟"
            fluid
            multiple
            selection
            search
            options={spotInfoList}
            value={selectSpot}
            onChange={(e, data) => {
              setSelectSpot(data.value);
            }}
          />
        </DropBox>
      </FilterBox>
      {deliveryLoading ? (
        <LoadingPage>로딩중...</LoadingPage>
      ) : (
        <DeliveryInfoBox>
          {deliveryInfoList.map(date => {
            return (
              <DateContainer key={date.serviceDate}>
                <DateBox>{date.serviceDate}</DateBox>
                {date.group.map(group => {
                  return (
                    <GroupContainer
                      key={
                        '스팟' +
                        date.serviceDate +
                        group.groupName +
                        group.groupId +
                        group.deliveryTime +
                        group.diningType +
                        group.spotName +
                        group.spotId
                      }>
                      <GroupHeader>
                        <Group>
                          <GroupName>스팟 이름 : {group.groupName}</GroupName>
                          <Spot>
                            <SpotId>상세 스팟 ID : {group.spotId || 0}</SpotId>
                          </Spot>
                          <Spot>
                            <SpotName>
                              상세 스팟 이름 :{group.spotName || '상세 스팟'}
                            </SpotName>
                          </Spot>
                        </Group>
                        <DeliveryTime>{group.deliveryTime}</DeliveryTime>
                      </GroupHeader>
                      <GroupAddress>
                        <Address>배송지 : {group.address || '배송지'}</Address>
                      </GroupAddress>
                      {group.makers.map(makers => {
                        const newArray = makers?.foods?.reduce(function (
                          acc,
                          current,
                        ) {
                          if (
                            acc.findIndex(({id}) => id === current.id) === -1
                          ) {
                            acc.push(current);
                          }
                          return acc;
                        },
                        []);
                        return (
                          <MakersContainer
                            key={
                              '메이커스' +
                              date.serviceDate +
                              group.groupId +
                              makers.makersId +
                              makers.pickupTime +
                              group.diningType
                            }>
                            <MakersHeader>
                              <MakersName>{makers.makersName}</MakersName>
                              <PickupTime>{makers.pickupTime}</PickupTime>
                            </MakersHeader>
                            {newArray.map(food => {
                              return (
                                <FoodsContainer
                                  key={
                                    '푸드' +
                                    date.serviceDate +
                                    group.groupId +
                                    makers.makersId +
                                    makers.pickupTime +
                                    food.foodName +
                                    food.foodCount +
                                    food.foodId +
                                    group.diningType +
                                    group.spotName +
                                    group.spotId
                                  }>
                                  <FoodHeader>
                                    <FoodName>{food.foodName}</FoodName>
                                    <FoodName>{food.foodCount}</FoodName>
                                  </FoodHeader>
                                </FoodsContainer>
                              );
                            })}
                          </MakersContainer>
                        );
                      })}
                    </GroupContainer>
                  );
                })}
              </DateContainer>
            );
          })}
        </DeliveryInfoBox>
      )}
    </Container>
  );
};

export default Delivery;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;
const HeadTitle = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`;

const DateSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (min-width: 576px) {
    width: 100%;
  }
  /* Tablet */
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 968px) {
    width: 50%;
  }
`;
const FilterBox = styled.div`
  width: 1000px;
  gap: 10px;
  display: flex;
`;
const DropBox = styled.div`
  min-width: 250px;
  max-width: 350px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DeliveryInfoBox = styled.div`
  display: flex;

  flex-direction: column;
`;
const LoadingPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
const MakersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 30px;
`;
const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #cdcdcd;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
`;
const Group = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;
const Spot = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 1px;
  gap: 15px;
`;
const SpotName = styled.div`
  font-size: 14px;
  color: #141414;
  font-weight: 600;
`;
const SpotId = styled.div`
  font-size: 14px;
  color: blue;
  font-weight: 600;
`;
const GroupAddress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #141414;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
`;
const FoodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;
const MakersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
`;
const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const FoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const GroupName = styled.div`
  font-size: 15px;
  padding: 2px;
  padding-left: 5px;
  color: #141414;
  font-weight: 600;
`;
const Address = styled.div`
  font-size: 15px;
  padding: 5px;
  font-weight: 600;
`;
const MakersName = styled.div`
  font-size: 15px;
  padding: 5px;
`;
const FoodName = styled.div`
  font-size: 15px;
  padding: 5px;
`;
const DeliveryTime = styled.div`
  font-size: 15px;
`;
const PickupTime = styled.div`
  font-size: 15px;
`;
const DateBox = styled.div`
  font-size: 18px;
  width: 100%;
  background-color: aliceblue;
  padding: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
