import React, {useEffect} from 'react';

import styled, { css } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useState} from 'react';
import PublicSelectDatePicker from 'components/PublicSelectDatePicker';
import {Button, Dropdown, Label} from 'semantic-ui-react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {formattedTime, formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import useTitle from 'hooks/useTitle';
import { getAccessToken, getAccessTokenName } from 'utils/checkDashToken';
import instance from 'shared/axiosDash';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import DashLoginPage from './dashLogin/Login'
import DashAlertModal from 'components/dashAlertModal/DashAlertModal';
import jwtUtils from 'utils/jwtUtill';



const Delivery = () => {
  useTitle('배송정보 페이지');
  const queryClient = useQueryClient();
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
  // const [name,setName] = useState(false);
  const [selectClient, setSelectClient] = useState([]);
  const [selectSpot, setSelectSpot] = useState([]);
  const token =getAccessToken();
  const name =getAccessTokenName();
    
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
      `delivery/schedules?startDate=${formattedWeekDateZ(
        startDate,
      )}&endDate=${formattedWeekDateZ(endDate)}${groupIds}${spotIds}`,
    );
  },{
    retry:false
  });
  const {mutateAsync :updateStatus} =  useMutation(
    (data) => instance.post('delivery/status/complete',data),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(['deliveryInfo']);
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
  const {mutateAsync :updateCancelStatus} =  useMutation(
    (data) => instance.post('delivery/status/cancel',data),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(['deliveryInfo']);
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
  const [deliveryInfoList, setDeliveryInfoList] = useState([]);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState({});
  const [spotInfoList, setSpotInfoList] = useState([]);
  const [spotCompleteList, setSpotCompleteList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCancelOpen, setModalCancelOpen] = useState(false);
  const completeButton = async () => {
    try {
      await updateStatus(selectedSpot)
      closeModal();
    } catch (error) {
      alert(error.toString());
      closeModal();
    }
   
  };
  const cancelButton = async () => {
    try {
      await updateCancelStatus(selectedSpot)
      closeCancelModal();
    } catch (error) {
      alert(error.toString());
      closeCancelModal();
    }
   
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openCancelModal = () => {
    setModalCancelOpen(true);
  };

  const closeCancelModal = () => {
    setModalCancelOpen(false);
  };
  useEffect(() => {
    console.log(deliveryInfo)
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
      const todayDeliveryData = deliveryInfo?.data?.deliveryInfoList?.filter((v,i) => {
        console.log(formattedWeekDateZ(new Date()).toString(),v.serviceDate.toString())
        return formattedWeekDateZ(new Date()).toString()=== v.serviceDate.toString()
      })
      if(todayDeliveryData)
        setSpotCompleteList(todayDeliveryData.map((v,i) => {
          return v.group.map((g)=>{
            return {key :g.spotId+i, spotId: g.spotId, deliveryStatus: g.deliveryStatus, deliveryTime:v.deliveryTime, closeableTime:g.closeableTime}
          }); 
        }).flat());
    }
  }, [deliveryInfo]);
  // useEffect(()=>{
  //   if(token) setName()
  // },[token])
  useEffect(() => {
    setDeliveryInfoList([]);

    deliveryRefetch();
  }, [startDate, endDate, selectClient, selectSpot, deliveryRefetch]);

  return (
    <Container open={open}>
    <Wrap open={open}>
      <HeaderContainer>
        <HeadTitle>배송정보</HeadTitle>
        <LoginBox>
        {!jwtUtils.isAuth(token) ? <Button type='button' color='olive' onClick={()=>setOpen(true)} >로그인</Button>:
        <div style={{display:'flex', alignItems:'center'}}>{name}님 안녕하세요 <Button type='button' color='google plus' onClick={()=>{
          localStorage.removeItem('dash-token')
          window.location.reload();
        }} >로그아웃</Button></div>}
        </LoginBox>
      </HeaderContainer>
      {jwtUtils.isAuth(token) && spotCompleteList?.length> 0 && <DeliveryComplateText>오늘 배송 목록</DeliveryComplateText>}
      {jwtUtils.isAuth(token) && <DeliveryComplate>
        {spotCompleteList?.length> 0 && spotCompleteList.map((spot)=>{
          return <CompleteButtonBox key={spot.key}><Button  color={spot.deliveryStatus === 2? "red": spot.deliveryStatus === 1? 'grey':"twitter"} onClick={()=>{
            setSelectedSpot({
              spotId:spot.spotId,
              deliveryTime:spot.deliveryTime
            })
            if(spot.deliveryStatus=== 0){
              
              openModal();
            }
            if(spot.deliveryStatus=== 2){
              
              openCancelModal();
            }
            if(spot.deliveryStatus=== 1){
              alert("배송이 완료된 스팟은 취소할 수 없습니다.")
            }
          }}>{spot.spotId} ({spot.deliveryTime})</Button>
          {spot.closeableTime &&<CompleteText>{formattedTime(new Date(spot.closeableTime))}에 완료됩니다.</CompleteText>}
          </CompleteButtonBox>
        })}
      </DeliveryComplate>}
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
          {deliveryInfoList?.length > 0 ? deliveryInfoList.map((date,i) => {
            return (
              <DateContainer key={date.serviceDate + i}>
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
                        <DeliveryTime>도착:{date?.deliveryTime}</DeliveryTime>
                      </GroupHeader>
                      <GroupAddress>
                        <Address>배송지 : {group?.address || '배송지'}</Address>
                      </GroupAddress>
                      {group.makersList.map((makers,i) => {
                        return (
                          <MakersContainer
                            key={
                              '메이커스' +
                              date.serviceDate +
                              i+
                              date.deliveryTime +
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
                              <PickupWrap>
                                <PickupTime>
                                  픽업:{makers.pickupTime}
                                </PickupTime>
                                <PickupTime>
                                  총 수량 : {makers.totalCount}
                                </PickupTime>
                              </PickupWrap>
                            </MakersHeader>
                            {makers?.foods?.map((food,i) => {
                              return (
                                <FoodsContainer
                                  key={
                                    '푸드' +
                                    i+
                                    date.serviceDate +
                                    date.deliveryTime+
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
          }):<LoadingPage>오늘 배송 목록이 없습니다.</LoadingPage>}
        </DeliveryInfoBox>
      )}
      
    </Wrap>
    {open &&<LoginContainer>
      <DashLoginPage setOpen={setOpen}/>
    </LoginContainer>}
    <DashAlertModal
        open={modalOpen}
        message={'배송완료'}
        setAlertModalOpen={closeModal}
        action={completeButton}
        actionMessage={'확인'}
        cancelMessage={'취소'}
        label={`스팟 ${selectedSpot.spotId}의 배송을 완료 하겠습니까?`}
      />
    <DashAlertModal
        open={modalCancelOpen}
        message={'배송완료 취소'}
        setAlertModalOpen={closeCancelModal}
        action={cancelButton}
        actionColor={'red'}
        actionMessage={'확인'}
        cancelMessage={'취소'}
        label={`스팟 ${selectedSpot.spotId}의 배송을 취소 하겠습니까?`}
      />
  </Container>
  );
};

export default Delivery;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
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
  margin-bottom: 10px;
`
const LoginBox = styled.div`
  
`
const DeliveryComplate = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 30px;
`
const DeliveryComplateText = styled.div`
  font-size: 18px;
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
  padding-left: 20px;
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
const CompleteButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 65px;
`;
const CompleteText = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin-top: 3px;
  color: red;
`
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
  //align-items: center;
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
  white-space: break-spaces;
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

const PickupWrap = styled.div`
  width: 80px;
  white-space: nowrap;
  text-align: end;
  align-items: flex-start;
  padding-top: 5px;
`;
