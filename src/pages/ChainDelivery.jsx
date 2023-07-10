import React, {useCallback, useEffect, useRef} from 'react';

import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useState} from 'react';
import PublicSelectDatePicker from 'components/PublicSelectDatePicker';
import {Button, Dropdown, Label, Table} from 'semantic-ui-react';
import {useQuery} from 'react-query';
import {formattedWeekDateZ} from 'utils/dateFormatter';
import useTitle from 'hooks/useTitle';
import chainInstance from 'shared/chainAxios';
import { diningFormatted } from 'utils/statusFormatter';
import * as XLSX from 'xlsx';

const TableHeaderData = [
  {id: 0, text: '스팟 타입'},
  {id: 1, text: '날짜'},
  {id: 2, text: '식사 타입'},
  {id: 3, text: '배송 시간'},
  {id: 4, text: '배송 번호'},
  {id: 5, text: '메이커스 이름'},
  {id: 6, text: '메이커스 주소'},
  {id: 7, text: '메이커스 번호'},
  {id: 8, text: '상품 이름'},
  {id: 9, text: '수량'},
  {id: 10, text: '유저 이름'},
  {id: 11, text: '유저 주소'},
  {id: 12, text: '유저 핸드폰 번호'},
  {id: 13, text: '배송 메모'},
];

const ChainDelivery = () => {
  useTitle('배송업체 주문 정보 페이지');
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
  const deliveryIdListRef = useRef();
  const [selectSpotType, setSelectSpotType] = useState();
  const [selectMakers, setSelectMakers] = useState();
  const [selectMealType, setSelectMealType] = useState();
  const [selectDeliveryTime, setSelectDeliveryTime] = useState();
  const [selectDeliveryId, setSelectDeliveryId] = useState();
  const [selectUser, setSelectUser] = useState();
  const {
    data: deliveryInfo,
    refetch: deliveryRefetch,
    isFetching: deliveryLoading,
  } = useQuery(
    ['chainDelivery'],
    () => {
      return chainInstance.get(
        `/delivery/drivers?startDate=${formattedWeekDateZ(
          startDate,
        )}&endDate=${formattedWeekDateZ(endDate)}`,
      );
    },
    {
      retry: false,
    },
  );
  const [deliveryInfoList, setDeliveryInfoList] = useState([]);
  const [spotTypeList, setSpotTypeList] = useState([]);
  const [makersList, setMakersList] = useState([]);
  const [mealTypeList, setMealTypeList] = useState([]);
  const [deliveryTimeList, setDeliveryTimeList] = useState([]);
  const [deliveryIdList, setDeliveryIdList] = useState([]);
  const [userList, setUserList] = useState([]);

  const excelButton = async () => {
    const reqArrays = [];
    reqArrays.push([
      'spotType',
      'serviceDate',
      'diningType',
      'deliveryTime',
      'orderNumber',
      'makersName',
      'makersAddress',
      'makersPhone',
      'foodName',
      'count',
      'userName',
      'userAddress',
      'userPhone',
      'memo',
    ]);
    reqArrays.push(TableHeaderData.map(v => v.text));
    deliveryInfoList.map(el => {
      const reqArray = [];
      reqArray.push(el.spotType);
      reqArray.push(el.serviceDate);
      reqArray.push(el.diningType);
      reqArray.push(el.deliveryTime);
      reqArray.push(el.orderNumber);
      reqArray.push(el.makersName);
      reqArray.push(el.makersAddress);
      reqArray.push(el.makersPhone);
      reqArray.push(el.foodName);
      reqArray.push(el.count);
      reqArray.push(el.userName);
      reqArray.push(el.userAddress);
      reqArray.push(el.userPhone);
      reqArray.push(el.memo);
      reqArrays.push(reqArray);
      return reqArrays;
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

    XLSX.utils.book_append_sheet(workbook, worksheet, '배송 정보');
    XLSX.writeFile(workbook, '배송 정보.xlsx');
  };
  
  const onClearSelect = useCallback(() => {
    setSelectSpotType('');
    setSelectMakers('');
    setSelectMealType('');
    setSelectDeliveryTime('');
    setSelectDeliveryId('');
    setSelectUser('');    
   }, []);


  useEffect(() => {
    deliveryRefetch();
  }, [startDate, endDate, deliveryRefetch]);
  useEffect(() => {
    if (deliveryInfo?.data) {
      const spotData = deliveryInfo?.data.map(v => v.spotType);
      const userNameData = deliveryInfo?.data.map(v => v.userName);
      const orderNumberData = deliveryInfo?.data.map(v => v.orderNumber);
      const deliveryTimeData = deliveryInfo?.data.map(v => v.deliveryTime);
      const makersNameData = deliveryInfo?.data.map(v => v.makersName);
      const diningTypeData = deliveryInfo?.data.map(v => v.diningType);
      const spotFilterData = spotData.filter((element, index) => {
        return spotData.indexOf(element) === index;
      });
      const userNameFilterData = userNameData.filter((element, index) => {
        return userNameData.indexOf(element) === index;
      });
      const orderNumberFilterData = orderNumberData.filter((element, index) => {
        return orderNumberData.indexOf(element) === index;
      });
      const deliveryTimeFilterData = deliveryTimeData.filter(
        (element, index) => {
          return deliveryTimeData.indexOf(element) === index;
        },
      );
      const makersNameFilterData = makersNameData.filter((element, index) => {
        return makersNameData.indexOf(element) === index;
      });
      const diningTypeFilterData = diningTypeData.filter((element, index) => {
        return diningTypeData.indexOf(element) === index;
      });
      setSpotTypeList(
        spotFilterData.map((v, i) => {
          return {key: v, text: v, value: v};
        }),
      );
      setMakersList(
        makersNameFilterData.map(v => {
          return {key: v, text: v, value: v};
        }),
      );
      setMealTypeList(
        diningTypeFilterData.map(v => {
          return {key: v, text: diningFormatted(v), value: v};
        }),
      );
      setDeliveryTimeList(
        deliveryTimeFilterData.map(v => {
          return {key: v, text: v, value: v};
        }),
      );
      setDeliveryIdList(
        orderNumberFilterData.map(v => {
          return {key: v, text: v, value: v};
        }),
      );
      setUserList(
        userNameFilterData.map(v => {
          return {key: v, text: v, value: v};
        }),
      );
    }
  }, [deliveryInfo?.data]);
  useEffect(() => {
    const data = deliveryInfo?.data
      ?.map(v => {
        if (
          (selectMakers ? v.makersName === selectMakers : true) &&
          (selectSpotType ? v.spotType === selectSpotType : true) &&
          (selectMealType ? v.diningType === selectMealType : true) &&
          (selectDeliveryTime ? v.deliveryTime === selectDeliveryTime : true) &&
          (selectDeliveryId ? v.orderNumber === selectDeliveryId : true) &&
          (selectUser ? v.userName === selectUser : true)
        ) {
          return v;
        }
      })
      .filter(v => v);
    setDeliveryInfoList(data);

  }, [
    selectSpotType,
    selectMakers,
    selectMealType,
    selectDeliveryTime,
    selectDeliveryId,
    selectUser,
    deliveryInfo?.data,
  ]);
  return (
    <Container>
      <HeadTitle>배송업체 주문 정보</HeadTitle>
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
          <Label>스팟 타입</Label>
          <Dropdown
            placeholder="스팟 타입"
            fluid
            selection
            search
            options={spotTypeList}
            value={selectSpotType}
            onChange={(e, data) => {
              setSelectSpotType(data.value);
            }}
          />
        </DropBox>
        <DropBox>
          <Label>메이커스</Label>
          <Dropdown
            placeholder="메이커스"
            fluid
            selection
            search
            options={makersList}
            value={selectMakers}
            onChange={(e, data) => {
              setSelectMakers(data.value);
            }}
          />
        </DropBox>
        <DropBoxVertical>
          <DropBox>
            <Label>식사 타입</Label>
            <Dropdown
              placeholder="식사 타입"
              fluid
              selection
              search
              options={mealTypeList}
              value={selectMealType}
              onChange={(e, data) => {
                setSelectMealType(data.value);
              }}
            />
          </DropBox>
          <DropBox>
            <Label>배송 시간</Label>
            <Dropdown
              placeholder="배송 시간"
              fluid
              selection
              search
              options={deliveryTimeList}
              value={selectDeliveryTime}
              onChange={(e, data) => {
                setSelectDeliveryTime(data.value);
              }}
            />
          </DropBox>
          <DropBox>
            <Label>배송 번호</Label>
            <Dropdown
              ref={deliveryIdListRef}
              placeholder="상세 스팟"
              fluid
              selection
              search
              options={deliveryIdList}
              value={selectDeliveryId}
              onChange={(e, data) => {
                setSelectDeliveryId(data.value);
              }}
            />
          </DropBox>
        </DropBoxVertical>
        <DropBox>
          <Label>유저</Label>
          <Dropdown
            placeholder="유저"
            fluid
            selection
            search
            options={userList}
            value={selectUser}
            onChange={(e, data) => {
              setSelectUser(data.value);
            }}
          />
        </DropBox>
        <ButtonBox>
          <Button color="green" content="엑셀 내보내기" onClick={excelButton} />
          <Button
            color="black"
            content="필터 초기화"
            icon="redo"
            onClick={onClearSelect}
          />
        </ButtonBox>
      </FilterBox>
      <DeliveryInfoBox>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {TableHeaderData.map(header => {
                return (
                  <Table.HeaderCell key={header.id} textAlign="center">
                    {header.text}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {deliveryInfoList?.length > 0 &&
              deliveryInfoList.map((v, i) => {
                console.log(v, i);
                return (
                  <Table.Row key={i}>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.spotType}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.serviceDate}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.diningType}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.deliveryTime}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.orderNumber}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.makersName}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.makersAddress}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.makersPhone}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.foodName}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.count}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.userName}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.userAddress}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.userPhone}
                    </Table.Cell>
                    <Table.Cell style={{whiteSpace: 'nowrap'}}>
                      {v.memo}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </DeliveryInfoBox>
    </Container>
  );
};

export default ChainDelivery;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const DropBoxVertical = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const DropBox = styled.div`
  min-width: 250px;
  max-width: 350px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 10px;
`;

const DeliveryInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
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
