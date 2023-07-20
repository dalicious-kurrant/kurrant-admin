import React, {useEffect} from 'react';

import styled, { css } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useState} from 'react';
import PublicSelectDatePicker from 'components/PublicSelectDatePicker';
import {Button, Dropdown, Label} from 'semantic-ui-react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import useTitle from 'hooks/useTitle';
import { getAccessToken } from 'utils/checkDashToken';
import instance from 'shared/axiosDash';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import DashLoginPage from './dashLogin/Login'



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
  const [open,setOpen] = useState(false);
  const [selectClient, setSelectClient] = useState([]);
  const [selectSpot, setSelectSpot] = useState([]);
  const token =getAccessToken();
    
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
    
    return await instance.get(
      `delivery?startDate=${formattedWeekDateZ(
        startDate,
      )}&endDate=${formattedWeekDateZ(endDate)}${groupIds}${spotIds}`,
    );
  });
  const [deliveryInfoList, setDeliveryInfoList] = useState([]);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [spotInfoList, setSpotInfoList] = useState([]);
  useEffect(() => {
    if (deliveryInfo) {
      setDeliveryInfoList(deliveryInfo?.data?.deliveryInfoList);
      setGroupInfoList(
        deliveryInfo?.data?.groupInfoList?.map(v => {
          return {key: v.groupId, text: v.groupName, value: v.groupId};
        }),
      );
      setSpotInfoList(
        deliveryInfo?.data?.spotInfoList?.map(v => {
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
    <Container open={open}>
    <Wrap open={open}>
      <HeaderContainer>
        <HeadTitle>배송정보</HeadTitle>
        {!token ? <Button type='button' color='olive' onClick={()=>setOpen(true)} >로그인</Button>:<Button type='button' color='google plus' onClick={()=>{
          localStorage.removeItem('dash-token')
          window.location.reload();
        }} >로그아웃</Button>}
      </HeaderContainer>
        <DateRangePicker  endDate={endDate} setEndDate={setEndDate} startDate={startDate} setStartDate={setStartDate}/>
    
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
              setSelectSpot([]);
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
          {deliveryInfoList?.length > 0 && deliveryInfoList.map(date => {
            console.log(date)
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
                        <DeliveryTime>도착:{group?.deliveryTime}</DeliveryTime>
                      </GroupHeader>
                      <GroupAddress>
                        <Address>배송지 : {group?.address || '배송지'}</Address>
                      </GroupAddress>
                      {group.makersList.map(makers => {
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
                              <MakersFront>
                                <MakersName>{makers.makersName}</MakersName>
                                <MakersAddress>{makers.address}</MakersAddress>
                              </MakersFront>
                              <PickupTime>픽업:{makers.pickupTime}</PickupTime>
                            </MakersHeader>
                            {makers?.foods?.map(food => {
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
      
    </Wrap>
    {open &&<LoginContainer>
      <DashLoginPage setOpen={setOpen}/>
    </LoginContainer>}
  </Container>
  );
};

export default Delivery;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 20px;
  ${({open})=>{
    if(open){
      return css`
        height: 100vh;
        overflow: hidden;
      `
    }
  }}
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: 0 auto;
`;
const HeadTitle = styled.div`
  font-size: 30px;
`;
const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 50px;
`
const LoginContainer = styled.div`
  position: absolute;
`

const FilterBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
const MakersFront = styled.div`
  display: flex;
  flex-direction: column;
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
const MakersAddress = styled.div`
  font-size: 13px;
  font-weight: 400;
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
