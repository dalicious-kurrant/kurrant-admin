import React, {useEffect, useRef, useState} from 'react';
import {Button, Dropdown, Table} from 'semantic-ui-react';
import {
  PageWrapper,
  BtnWrapper,
  TableWrapper,
} from '../../../style/common.style';
import Select from 'react-select';
import styled from 'styled-components';

import * as XLSX from 'xlsx';
import {
  formattedFullDate,
  formattedWeekDate,
} from '../../../utils/dateFormatter';

import {
  useAllUserList,
  useCancelOrder,
  useEditOrderStatus,
  useGetGroupInfoList,
  useGetGroupList,
  useGetMakersList,
  useGetOrderList,
} from '../../../hooks/useOrderList';
import {orderApis} from '../../../api/order';
import withCommas from '../../../utils/withCommas';
import {useNavigate} from 'react-router-dom';
import {useQuery, useQueryClient} from 'react-query';
import Modal from '../../../components/alertModal/AlertModal';
import {useAtom} from 'jotai';
import {
  diningListAtom,
  diningTypeOptionAtom,
  endDateAtom,
  groupFilterAtom,
  groupInfoAtom,
  groupOptionAtom,
  makersOptionAtom,
  orderNumberAtom,
  orderStatusAtom,
  spotListAtom,
  spotOptionAtom,
  startDateAtom,
  userListAtom,
  userOptionAtom,
} from 'utils/store';
import {orderStatusFomatted, scheduleFormatted} from 'utils/statusFormatter';

// 상품 정보 페이지
const Order = () => {
  const navigate = useNavigate();
  const groupRef = useRef(null);
  const userRef = useRef(null);
  const spotRef = useRef(null);
  const makersRef = useRef(null);
  const diningRef = useRef(null);
  const orderStatusRef = useRef(null);
  // const day = new Date();
  // const days = formattedWeekDate(day);
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);
  const [groupOption, setGroupOption] = useAtom(groupOptionAtom);
  const [userOption, setUserOption] = useAtom(userOptionAtom);
  const [makersOption, setMakersOption] = useAtom(makersOptionAtom);
  const [spotOption, setSpotOption] = useAtom(spotOptionAtom);
  const [diningTypeOption, setDiningTypeOption] = useAtom(diningTypeOptionAtom);
  const [orderStatusOption, setOrderStatusOption] = useAtom(orderStatusAtom);
  const [grouptInfoId, setGroupInfoId] = useAtom(groupInfoAtom);
  const [spotList, setSpotList] = useAtom(spotListAtom);
  const [userList, setUserList] = useAtom(userListAtom);
  const [diningType, setDiningType] = useAtom(diningListAtom);
  const [checkItems, setCheckItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectClient, setSelectClient] = useState([]);

  const [defaultGroup, setDefaultGroup] = useAtom(groupFilterAtom);
  const [defaultUser, setDefaultUser] = useAtom(userOptionAtom);
  const [defaultMakers, setDefaultMakers] = useAtom(makersOptionAtom);
  const [defaultSpot, setDefaultSpot] = useAtom(spotOptionAtom);
  const [defaultDining, setDefaultDining] = useAtom(diningTypeOptionAtom);
  const [defaultOrderStatus, setDefaultOrderStatus] = useAtom(orderStatusAtom);
  const [, setOrderNumber] = useAtom(orderNumberAtom);

  const {data: groupList} = useGetGroupList();
  const {data: makersList} = useGetMakersList();
  const {data: allUserList} = useAllUserList();
  const {mutateAsync: cancelOrder} = useCancelOrder();
  const {mutateAsync: statusChange} = useEditOrderStatus();

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

  const orderStatusArr = [
    {value: 5, label: '결제완료'},
    {value: 6, label: '배송대기'},
    {value: 9, label: '배송중'},
    {value: 10, label: '배송완료'},
    {value: 11, label: '수령완료'},
  ];
  const orderStatusOptionArr = [
    {value: 4, label: '주문실패'},
    {value: 5, label: '결제완료'},
    {value: 6, label: '배송대기'},
    {value: 7, label: '취소'},
    {value: 9, label: '배송중'},
    {value: 10, label: '배송완료'},
    {value: 11, label: '수령완료'},
    {value: 12, label: '수동 환불'},
    {value: 13, label: '자동 환불'},
    {value: 14, label: '리뷰 작성 완료'},
  ];

  const orderStatusChangeOptionArr = [
    // {key: 4, value: 4, text: '주문실패'},
    {key: 5, value: 5, text: '결제완료'},
    {key: 6, value: 6, text: '배송대기'},
    // {key: 7,value: 7, text: '취소'},
    {key: 9, value: 9, text: '배송중'},
    // {key: 10,value: 10, text: '배송완료'},
    // {key: 11,value: 11, text: '수령완료'},
    // {key: 12,value: 12, text: '수동 환불'},
    // {key: 13,value: 13, text: '자동 환불'},
    // {key: 14,value: 14, text: '리뷰 작성 완료'},
  ];
  const groupInfoParam = grouptInfoId && `?groupId=${grouptInfoId}`;

  const sendGroupInfoParam = groupInfoParam && groupInfoParam;

  const {refetch: groupInfoRefetch} = useGetGroupInfoList(sendGroupInfoParam);
  const {data: orderList, refetch} = useGetOrderList(
    startDate,
    endDate,
    groupOption,
    userOption.value,
    spotOption.value,
    makersOption.value,
    diningTypeOption.value,
    orderStatusOption.value,
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
    // window.location.reload();
  };
  const goToPage = code => {
    navigate('/order/info/detail/' + code, {
      state: {
        orderCode: code,
      },
    });
    setOrderNumber(code);
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

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      orderList?.data?.map(el =>
        el.orderItemDailyFoodGroupList?.map(v =>
          v.orderItemDailyFoods?.forEach(el =>
            idArray.push(el.orderItemDailyFoodId),
          ),
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

  const excelButton = async () => {
    const reqArrays = [];
    reqArrays.push([
      'serviceDate',
      'orderDate',
      'orderTime',
      'groupName',
      'spotName',
      'userName',
      'userEmail',
      'phone',
      'diningType',
      'deliveryTime',
      'orderStatus',
      'makers',
      'foodName',
      'count',
      '',
      'price',
      'totalPrice',
      'supportPrice',
      'payPrice',
      'deliveryPrice',
      'orderCode',
    ]);
    reqArrays.push([
      '날짜',
      '주문일',
      '주문 시간',
      '그룹 이름',
      '스팟 이름',
      '유저 이름',
      '유저 이메일',
      '번호',
      '식사 타입',
      '배송 시간',
      '주문 상태',
      '메이커스 이름',
      '상품 이름',
      '수량',
      '공급가',
      '최종 가격',
      '결제 총금액',
      '지원금',
      '추가 결제금액',
      '배송비',
      '오더번호',
    ]);
    orderList?.data.map(el => {
      return el.orderItemDailyFoodGroupList?.map(v => {
        return v.orderItemDailyFoods?.map(item => {
          const reqArray = [];
          reqArray.push(v.serviceDate);
          reqArray.push(v.orderDateTime.split('T')[0]);
          reqArray.push(v.orderDateTime.split('T')[1].split('.')[0]);
          reqArray.push(v.groupName);
          reqArray.push(v.spotName);
          reqArray.push(v.userName);
          reqArray.push(v.userEmail);
          reqArray.push(v.phone);
          reqArray.push(v.diningType);
          reqArray.push(item.deliveryTime);
          reqArray.push(item.orderStatus);
          reqArray.push(item.makers);
          reqArray.push(item.foodName);
          reqArray.push(item.count);
          reqArray.push(item.supplyPrice ?? 0);
          reqArray.push(item.price);
          reqArray.push(v.totalPrice);
          reqArray.push(v.supportPrice);
          reqArray.push(v.payPrice);
          reqArray.push(v.deliveryPrice);
          reqArray.push(v.orderCode);
          reqArrays.push(reqArray);
          return reqArrays;
        });
      });
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

    XLSX.utils.book_append_sheet(workbook, worksheet, '주문 정보');
    XLSX.writeFile(workbook, '주문 정보.xlsx');
  };

  const orderStatusChange = async e => {
    const data = {
      status: e.value,
      idList: checkItems,
    };
    // console.log(data, '86');
    if (checkItems.length !== 0) {
      await statusChange(data);
    }
  };
  const orderStatusChangeAll = async e => {
    const idArray = [];
    orderList?.data?.map(el =>
      el.orderItemDailyFoodGroupList?.map(v =>
        v.orderItemDailyFoods?.map(s => {
          if (selectClient.includes(orderStatusFomatted(s.orderStatus)))
            idArray.push(s.orderItemDailyFoodId);
        }),
      ),
    );
    const data = {
      status: 10,
      idList: idArray,
    };
    // console.log(idArray)
    if (idArray.length !== 0) {
      await statusChange(data);
      setSelectClient([]);
    } else {
      alert('변경할 상태가 존재하지 않습니다.');
      setSelectClient([]);
    }
  };

  useEffect(() => {
    refetch();
  }, [
    startDate,
    endDate,
    groupOption,
    userOption,
    spotOption,
    makersOption,
    diningTypeOption,
    orderStatusOption,
    refetch,
  ]);

  useEffect(() => {
    groupInfoRefetch();
  }, [groupInfoParam, groupInfoRefetch]);
  return (
    <PageWrapper>
      <label>서비스일 날짜</label>
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
        <Button color="green" content="엑셀 내보내기" onClick={excelButton} />
      </ResetButton>

      <SelectBoxWrapper>
        <SelectBoxWrap>
          <span>고객사</span>
          <SelectBox
            ref={groupRef}
            options={groupArr}
            placeholder="고객사"
            defaultValue={defaultGroup}
            onChange={e => {
              if (e) {
                setDefaultGroup(e);
                setGroupOption(e.value);
                setGroupInfoId(e.value);
              } else {
                setGroupOption('');
              }
            }}
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <span>유저</span>
          <SelectBox
            ref={userRef}
            options={userArr.length === 0 ? allUserArr : userArr}
            placeholder="유저"
            defaultValue={defaultUser}
            onChange={e => {
              if (e) {
                setUserOption(e.value);
                setDefaultUser(e);
              } else {
                setUserOption('');
              }
            }}
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <span>스팟 선택</span>
          <SelectBox
            ref={spotRef}
            options={spotArr}
            placeholder="스팟 선택"
            defaultValue={defaultSpot}
            onChange={e => {
              if (e) {
                setSpotOption(e.value);
                setDefaultSpot(e);
              } else {
                setSpotOption('');
              }
            }}
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <span>메이커스 선택</span>
          <SelectBox
            ref={makersRef}
            options={makersArr}
            placeholder="메이커스 선택"
            defaultValue={defaultMakers}
            onChange={e => {
              if (e) {
                setMakersOption(e.value);
                setDefaultMakers(e);
              } else {
                setMakersOption('');
              }
            }}
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <span>식사타입</span>
          <SelectBox
            ref={diningRef}
            options={diningTypeArr}
            placeholder="식사타입"
            defaultValue={defaultDining}
            onChange={e => {
              if (e) {
                setDiningTypeOption(e.value);
                setDefaultDining(e);
              } else {
                setDiningTypeOption('');
              }
            }}
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <span>주문 상태</span>
          <SelectBox
            ref={orderStatusRef}
            options={orderStatusOptionArr}
            placeholder="주문 상태"
            defaultValue={defaultOrderStatus}
            onChange={e => {
              if (e) {
                setOrderStatusOption(e.value);
                setDefaultOrderStatus(e);
              } else {
                setOrderStatusOption('');
              }
            }}
          />
          <OrderStatus>
            <span>주문상태 변경</span>
            <SelectBox
              options={orderStatusArr}
              placeholder="주문상태 변경"
              onChange={e => orderStatusChange(e)}
            />
          </OrderStatus>
        </SelectBoxWrap>
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
      <OrderStatusBox>
        <Dropdown
          placeholder="변경할 상태"
          selection
          search
          multiple
          options={orderStatusChangeOptionArr}
          value={selectClient}
          onChange={(e, data) => {
            setSelectClient(data.value);
          }}
        />
        <Button
          color="orange"
          content="배송 상태 변경"
          onClick={async () => {
            await orderStatusChangeAll();
          }}
        />
      </OrderStatusBox>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} textAlign="center">
                <input
                  type="checkbox"
                  onChange={e => handleAllCheck(e.target.checked)}
                />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문 시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">그룹 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">유저 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                유저 이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송 시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문 상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                메이커스 이름
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">공급가</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">최종 가격</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                결제 총금액
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">지원금</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                추가 결제금액
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송비</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">오더번호</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orderList?.data?.map(el => {
              return el.orderItemDailyFoodGroupList?.map((v, i) => {
                return v.orderItemDailyFoods?.map((item, idx) => {
                  return (
                    <TableRow
                      onClick={() => goToPage(v.orderCode)}
                      key={v.orderCode + idx}>
                      <Table.Cell
                        textAlign="center"
                        onClick={e => e.stopPropagation()}>
                        <input
                          checked={
                            checkItems.includes(item.orderItemDailyFoodId)
                              ? true
                              : false
                          }
                          type="checkbox"
                          onClick={e => {
                            checked(e, item.orderItemDailyFoodId);
                          }}
                          onChange={e =>
                            handleSingleCheck(
                              e.target.checked,
                              item.orderItemDailyFoodId,
                            )
                          }
                        />
                      </Table.Cell>

                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {v.serviceDate}
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {v.orderDateTime.split('T')[0]}
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {v.orderDateTime.split('T')[1].split('.')[0]}
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>{v.groupName}</div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>{v.spotName}</div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>{v.userName}</div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>{v.userEmail}</div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">{v.phone}</Table.Cell>
                      <Table.Cell textAlign="center">{v.diningType}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.deliveryTime}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.orderStatus === '취소' ? (
                          <OrderCancel>{item.orderStatus}</OrderCancel>
                        ) : (
                          item.orderStatus
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{whiteSpace: 'nowrap'}}>{item.makers}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{whiteSpace: 'nowrap'}}>
                          {item.foodName}
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">{item.count}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(
                            item.supplyPrice === 0 ? '0' : item.supplyPrice,
                          )}
                          원
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(item.price)}원
                        </div>
                      </Table.Cell>

                      {idx === 0 && (
                        <Table.Cell
                          rowSpan={v.orderItemDailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <div style={{whiteSpace: 'nowrap'}}>
                            {withCommas(
                              v.totalPrice === 0 ? '0' : v.totalPrice,
                            )}
                            원
                          </div>
                        </Table.Cell>
                      )}
                      {idx === 0 && (
                        <Table.Cell
                          rowSpan={v.orderItemDailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <div style={{whiteSpace: 'nowrap'}}>
                            {withCommas(
                              v.supportPrice === 0 ? '0' : v.supportPrice,
                            )}
                            원
                          </div>
                        </Table.Cell>
                      )}
                      {idx === 0 && (
                        <Table.Cell
                          rowSpan={v.orderItemDailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <div style={{whiteSpace: 'nowrap'}}>
                            {withCommas(v.payPrice === 0 ? '0' : v.payPrice)}원
                          </div>
                        </Table.Cell>
                      )}
                      {idx === 0 && (
                        <Table.Cell
                          rowSpan={v.orderItemDailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <div style={{whiteSpace: 'nowrap'}}>
                            {withCommas(
                              v.deliveryPrice === 0 ? '0' : v.deliveryPrice,
                            )}
                            원
                          </div>
                        </Table.Cell>
                      )}
                      {idx === 0 && (
                        <Table.Cell
                          rowSpan={v.orderItemDailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <div style={{whiteSpace: 'nowrap'}}>
                            {v.orderCode}
                          </div>
                        </Table.Cell>
                      )}
                    </TableRow>
                  );
                });
              });
            })}
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
  flex: 1;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  margin: 24px 0px 24px 0px;
  width: 90%;
  gap: 20px;
  justify-content: space-between;
`;

const SelectBox = styled(Select)`
  flex: 1;
  margin-top: 4px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

const ResetButton = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const OrderCancel = styled.span`
  color: ${({theme}) => theme.colors.red[500]};
`;

const OrderStatus = styled.div`
  margin-top: 12px;
`;
const OrderStatusBox = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  margin-bottom: 20px;
`;
