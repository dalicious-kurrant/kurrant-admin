import React, {useEffect, useRef, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {
  PageWrapper,
  BtnWrapper,
  TableWrapper,
} from '../../../style/common.style';
import Select from 'react-select';
import styled from 'styled-components';
import {formattedWeekDate} from '../../../utils/dateFormatter';
import {
  useAllUserList,
  useCancelOrder,
  useGetGroupList,
  useGetMakersList,
  useGetOrderList,
} from '../../../hooks/useOrderList';
import {orderApis} from '../../../api/order';
import withCommas from '../../../utils/withCommas';
import {useNavigate} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import Modal from '../../../components/alertModal/AlertModal';
import {useAtom} from 'jotai';
import {endDateAtom, groupOptionAtom, startDateAtom} from 'utils/store';

// 상품 정보 페이지
const Order = () => {
  const navigate = useNavigate();
  const groupRef = useRef(null);
  const userRef = useRef(null);
  const spotRef = useRef(null);
  const makersRef = useRef(null);
  const diningRef = useRef(null);
  // const day = new Date();
  // const days = formattedWeekDate(day);
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);
  const [groupOption, setGroupOption] = useAtom(groupOptionAtom);
  const [userOption, setUserOption] = useState('');
  const [makersOption, setMakersOption] = useState('');
  const [spotOption, setSpotOption] = useState('');
  const [diningTypeOption, setDiningTypeOption] = useState('');
  const [spotList, setSpotList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [diningType, setDiningType] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(groupOption, '07');
  const {data: groupList} = useGetGroupList();
  const {data: makersList} = useGetMakersList();
  const {data: allUserList} = useAllUserList();
  const {mutateAsync: cancelOrder} = useCancelOrder();

  const groupInfoList = async id => {
    const res = await orderApis.groupInfoList(id);
    setUserList(res.data.users);
    setSpotList(res.data.spots);
    setDiningType(res.data.diningTypes);
  };

  const groupArr = groupList?.data?.map(el => {
    return {
      value: el.groupId,
      label: el.groupName,
    };
  });

  const allUserArr = allUserList?.data?.users?.map(el => {
    return {
      value: el.userId,
      label: el.userName,
    };
  });

  const userArr =
    userList &&
    userList.map(el => {
      return {
        value: el.userId,
        label: el.userName,
      };
    });

  const spotArr =
    spotList &&
    spotList.map(el => {
      return {
        value: el.spotId,
        label: el.spotName,
      };
    });
  const diningTypeArr =
    diningType &&
    diningType.map(el => {
      return {
        value: el.code,
        label: el.diningType,
      };
    });
  const makersArr = makersList?.data?.map(el => {
    return {
      value: el.makersId,
      label: el.makersName,
    };
  });

  const group = groupOption && `&group=${groupOption}`;
  const user = userOption && `&userId=${userOption}`;
  const spots = spotOption && `&spots=${spotOption}`;
  const makers = makersOption && `&makersId=${makersOption}`;
  const diningTypecode =
    diningTypeOption && `&diningTypeCode=${diningTypeOption}`;
  const params = {
    group: group && group,
    user: user && user,
    spots: spots && spots,
    makers: makers && makers,
    type: diningTypecode && diningTypecode,
  };

  const {data: orderList, refetch} = useGetOrderList(
    startDate,
    endDate,
    params,
  );

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClearSelect = () => {
    if (groupRef.current) {
      groupRef.current.clearValue();
    }
    if (userRef.current) {
      userRef.current.clearValue();
    }
    if (spotRef.current) {
      spotRef.current.clearValue();
    }
    if (makersRef.current) {
      makersRef.current.clearValue();
    }
    if (diningRef.current) {
      diningRef.current.clearValue();
    }
    window.location.reload();
  };
  const goToPage = code => {
    navigate('/order/info/detail/' + code, {
      state: {
        orderCode: code,
      },
    });
  };

  const checked = (e, id) => {
    e.stopPropagation();
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };
  const checkboxList = orderList?.data
    ?.map(el => el.orderItemDailyFoods)
    .flat();
  // console.log(checkboxList);
  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      orderList?.data?.map(el =>
        el.orderItemDailyFoods.forEach(el =>
          idArray.push(el.orderItemDailyFoodId),
        ),
      );

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const cancelButton = async () => {
    await cancelOrder({idList: checkItems});
    closeModal();
    queryClient.invalidateQueries('orderList');
  };

  useEffect(() => {
    refetch();
  }, [group, spots, makers, diningTypecode, startDate, endDate, user, refetch]);

  return (
    <PageWrapper>
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
      <ResetButton>
        <Button
          color="black"
          content="필터 초기화"
          icon="redo"
          onClick={onClearSelect}
        />
      </ResetButton>

      <SelectBoxWrapper>
        <div>
          <span>고객사</span>
          <SelectBox
            ref={groupRef}
            options={groupArr}
            placeholder="고객사"
            onChange={e => {
              if (e) {
                setGroupOption(e.value);
                groupInfoList(e.value);
              } else {
                setGroupOption('');
              }
            }}
          />
        </div>
        <div>
          <span>유저</span>
          <SelectBox
            ref={userRef}
            options={userArr.length === 0 ? allUserArr : userArr}
            placeholder="유저"
            onChange={e => {
              if (e) {
                setUserOption(e.value);
              } else {
                setUserOption('');
              }
            }}
          />
        </div>
        <div>
          <span>스팟 선택</span>
          <SelectBox
            ref={spotRef}
            options={spotArr}
            placeholder="스팟 선택"
            onChange={e => {
              if (e) {
                setSpotOption(e.value);
              } else {
                setSpotOption('');
              }
            }}
          />
        </div>
        <div>
          <span>메이커스 선택</span>
          <SelectBox
            ref={makersRef}
            options={makersArr}
            placeholder="메이커스 선택"
            onChange={e => {
              if (e) {
                setMakersOption(e.value);
              } else {
                setMakersOption('');
              }
            }}
          />
        </div>
        <div>
          <span>식사타입</span>
          <SelectBox
            ref={diningRef}
            options={diningTypeArr}
            placeholder="식사타입"
            onChange={e => {
              if (e) {
                setDiningTypeOption(e.value);
              } else {
                setDiningTypeOption('');
              }
            }}
          />
        </div>
      </SelectBoxWrapper>

      <BtnWrapper>
        <Button
          color="red"
          content="주문 취소"
          icon="delete"
          onClick={() => {
            openModal();
          }}
        />
      </BtnWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} textAlign="center">
                <input
                  checked={
                    checkItems.length === (checkboxList && checkboxList.length)
                      ? true
                      : false
                  }
                  type="checkbox"
                  onChange={e => handleAllCheck(e.target.checked)}
                />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">그룹 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">유저 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송 시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문 상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                메이커스 이름
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">최종 가격</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">오더번호</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orderList?.data?.map(el =>
              el.orderItemDailyFoods.map((v, idx) => {
                return (
                  <TableRow
                    onClick={() => goToPage(v.orderCode)}
                    key={v.orderCode + idx}>
                    <Table.Cell
                      textAlign="center"
                      onClick={e => e.stopPropagation()}>
                      <input
                        checked={
                          checkItems.includes(v.orderItemDailyFoodId)
                            ? true
                            : false
                        }
                        type="checkbox"
                        onClick={e => {
                          checked(e, v.orderItemDailyFoodId);
                        }}
                        onChange={e =>
                          handleSingleCheck(
                            e.target.checked,
                            v.orderItemDailyFoodId,
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{v.serviceDate}</Table.Cell>
                    <Table.Cell textAlign="center">{v.groupName}</Table.Cell>
                    <Table.Cell textAlign="center">{v.spotName}</Table.Cell>
                    <Table.Cell textAlign="center">{v.userName}</Table.Cell>
                    <Table.Cell textAlign="center">{v.phone}</Table.Cell>
                    <Table.Cell textAlign="center">{v.diningType}</Table.Cell>
                    <Table.Cell textAlign="center">{v.deliveryTime}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {v.orderStatus === '취소' ? (
                        <OrderCancel>{v.orderStatus}</OrderCancel>
                      ) : (
                        v.orderStatus
                      )}
                    </Table.Cell>
                    <Table.Cell>{v.makers}</Table.Cell>
                    <Table.Cell>{v.foodName}</Table.Cell>
                    <Table.Cell textAlign="center">{v.count}</Table.Cell>
                    <Table.Cell textAlign="right">
                      {withCommas(v.price)}원
                    </Table.Cell>
                    <Table.Cell>{v.orderCode}</Table.Cell>
                  </TableRow>
                );
              }),
            )}
          </Table.Body>
        </Table>
      </TableWrapper>
      <Modal
        open={modalOpen}
        message={'선택한 주문을 취소하시겠습니까?'}
        setAlertModalOpen={closeModal}
        action={cancelButton}
        actionMessage={'예'}
        cancelMessage={'아니오'}
        label={`선택된 수 ${checkItems.length}`}
      />
    </PageWrapper>
  );
};

export default Order;

const SelectBoxWrap = styled.div`
  margin: 30px 0px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  margin: 24px 0px 50px 0px;
  width: 80%;
  justify-content: space-between;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-top: 4px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

const ResetButton = styled.div`
  margin-top: 50px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const OrderCancel = styled.span`
  color: ${({theme}) => theme.colors.red[500]};
`;
