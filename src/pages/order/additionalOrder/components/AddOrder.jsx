import {useEffect,  useState} from 'react';
import {Button, Dropdown, Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import Select from 'react-select';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';
import {useAtom} from 'jotai';
import {
  extraListDataAtom,
  extraOrderEndDateAtom,
  extraOrderGroupOptionAtom,
  extraOrderStartDateAtom,
} from 'utils/store';
import {
  useExtraOrder,
  useGetDetailSpotList,
  useGetExtraFoodList,
  useGetExtraHistory,
  useRefundExtraOrder,
} from 'hooks/useExtraOrder';
import withCommas from 'utils/withCommas';
import {useGetGroupList} from 'hooks/useOrderList';

const AddOrder = () => {
  const [groupOption, setGroupOption] = useAtom(extraOrderGroupOptionAtom);
  const [startDate, setStartDate] = useAtom(extraOrderStartDateAtom);
  const [endDate, setEndDate] = useAtom(extraOrderEndDateAtom);
  const [extraListData, setExtraListData] = useAtom(extraListDataAtom);
  const [spotOption, setSpotOption] = useState();
  const [, setDetailSpotOption] = useState();
  const {data: extraFoodList, refetch} = useGetExtraFoodList(
    startDate,
    endDate,
    groupOption,
  ); // 주문 food 리스트
  const {data: spotList, refetch: spotFetch} = useGetDetailSpotList(spotOption);
  const {data: extraHistory, refetch: historyRefetch} = useGetExtraHistory(
    startDate,
    endDate,
    groupOption,
  ); // 추가주문 히스토리
  const {mutateAsync: refundOrder} = useRefundExtraOrder();
  const {mutateAsync: extraOrder} = useExtraOrder();
  const {data: groupList} = useGetGroupList();
  const form = useForm({
    mode: 'all',
  });
  const {watch,  control} = form;

  const inputWatch = watch();

  const detailSpotArr = spotList?.data?.map(el => {
    return {
      value: el.spotId,
      label: el.spotName,
    };
  });

  const onSubmit = async () => {
    const reqData = extraListData.filter(
      extra =>
        extra.totalPrice &&
        extra.totalPrice > 0 &&
        extra.groupId &&
        extra.spotId &&
        extra.usage,
    );
    console.log(reqData, '1');
    if (reqData.length !== 0) {
      await extraOrder(reqData);
      window.location.reload();
    }
  };

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const refundOrderPress = async id => {
    await refundOrder({id: id});
  };

  const groupArr = groupList?.data?.map((el, idx) => {
    return {
      key: idx,
      value: el.groupId,
      text: el.groupName,
    };
  });

  const FilterClear = () => {
    setGroupOption(null);
  };
  useEffect(() => {
    let retArray = [];
    extraFoodList?.data.map(v => {
      return v.dailyFoods.map(daily => {
        retArray.push({
          serviceDate: v.serviceDate,
          diningType: v.diningType,
          foodId: daily.foodId,
          price: daily.price,
        });
        return undefined
      });
    });

    setExtraListData(retArray);
  }, [extraFoodList?.data, setExtraListData]);

  useEffect(() => {
    refetch();
    historyRefetch();
  }, [startDate, endDate, refetch, historyRefetch, groupOption]);

  useEffect(() => {
    spotFetch();
  }, [spotFetch, spotOption]);
  return (
    <Wrapper>
      <FilterWrap>
        <div style={{marginRight: 12}}>
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
        <div style={{marginRight: 12, width: 240}}>
          {groupArr && (
            <Dropdown
              placeholder="스팟"
              fluid
              selection
              search
              options={groupArr}
              value={groupOption}
              onChange={(e, data) => {
                setGroupOption(data.value);
              }}
            />
          )}
        </div>
        <div>
          <Button
            content="필터 초기화"
            color="twitter"
            size="small"
            onClick={FilterClear}
          />
        </div>
      </FilterWrap>
      <TableWrapper>
        <div style={{marginTop: 12}}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  요청 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  상세 스팟
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">사용목적</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">단가</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">총 금액</Table.HeaderCell>

                <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {extraHistory?.data?.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={10} textAlign="center">
                    추가 주문 내역이 없습니다.
                  </Table.Cell>
                </Table.Row>
              ) : (
                extraHistory?.data?.map((el, idx) => {
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.serviceDate}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.createdDateTime}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.groupName}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.spotName}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.usage}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.foodName}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{withCommas(el.price)}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.count}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{withCommas(el.totalPrice)}</InnerCell>
                      </Table.Cell>

                      <Table.Cell textAlign="center">
                        {el.orderStatus === '취소' ? (
                          <CancelText>취소완료</CancelText>
                        ) : (
                          <Button
                            content="취소"
                            color="red"
                            size="tiny"
                            onClick={() =>
                              refundOrderPress(el.orderItemDailyFoodId)
                            }
                          />
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table>
        </div>
        <div style={{marginTop: 48}}>
          <FormProvider {...form}>
            <Button
              content="주문"
              color="green"
              size="small"
              onClick={form.handleSubmit(onSubmit)}
            />
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    다이닝타입
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">가격</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    구매 가능 수량
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    상세 스팟
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    사용 목적
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">총액</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {extraFoodList?.data?.map((el, idx) => {
                  return el.dailyFoods.map((v, i) => {
                    const groupArr = v.groupList.map(el => {
                      return {
                        value: el.groupId,
                        label: el.groupName,
                      };
                    });

                    const countValue =
                      inputWatch[`${v.foodId}${el.serviceDate}count`];

                    return (
                      <Table.Row key={v.foodId}>
                        {
                          <Table.Cell
                            //rowSpan={el.dailyFoods.length}
                            textAlign="center"
                            verticalAlign="middle">
                            <InnerCell>{el.serviceDate}</InnerCell>
                          </Table.Cell>
                        }

                        <Table.Cell textAlign="center">
                          <InnerCell>{el.diningType}</InnerCell>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <div style={{minWidth: 150}}>{v.foodName}</div>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <InnerCell>{withCommas(v.price)}원</InnerCell>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <InnerCell>{v.foodCapacity + '개'}</InnerCell>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Controller
                            control={control}
                            name={`${v.foodId}${el.serviceDate}groupId`}
                            render={({field}) => {
                              return (
                                <InnerCell style={{minWidth: 200}}>
                                  <SelectBox
                                    // {...field}
                                    // value={field.value || ''}
                                    options={groupArr}
                                    placeholder="스팟"
                                    onChange={e => {
                                      setExtraListData(
                                        extraListData.map(extra => {
                                          if (
                                            extra.foodId === v.foodId &&
                                            el.serviceDate === extra.serviceDate
                                          ) {
                                            return {
                                              ...extra,
                                              groupId: e.value,
                                            };
                                          }
                                          return extra;
                                        }),
                                      );

                                      setSpotOption(e.value);

                                      return field.onChange(e.value);
                                    }}
                                  />
                                </InnerCell>
                              );
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Controller
                            control={control}
                            name={`${v.foodId}${el.serviceDate}spotId`}
                            render={({field}) => {
                              return (
                                <InnerCell style={{minWidth: 150}}>
                                  <SelectBox
                                    // {...field}
                                    // value={field.value || ''}
                                    options={detailSpotArr}
                                    placeholder="상세스팟"
                                    // defaultValue={defaultGroup}
                                    onChange={e => {
                                      console.log(e.value);
                                      setExtraListData(
                                        extraListData.map(extra => {
                                          if (
                                            extra.foodId === v.foodId &&
                                            el.serviceDate === extra.serviceDate
                                          ) {
                                            return {
                                              ...extra,
                                              spotId: e.value,
                                            };
                                          }
                                          return extra;
                                        }),
                                      );
                                      setDetailSpotOption(e.value);
                                      return field.onChange(e.value);
                                    }}
                                  />
                                </InnerCell>
                              );
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <InnerCell>
                            <Controller
                              control={control}
                              name={`${v.foodId}${el.serviceDate}`}
                              render={({field}) => {
                                return (
                                  <Input
                                    {...field}
                                    value={field.value || ''}
                                    type="text"
                                    onChange={e => {
                                      setExtraListData(
                                        extraListData.map(extra => {
                                          if (
                                            extra.foodId === v.foodId &&
                                            el.serviceDate === extra.serviceDate
                                          )
                                            return {
                                              ...extra,
                                              usage: e.target.value,
                                            };
                                          return extra;
                                        }),
                                      );
                                      return field.onChange(e.target.value);
                                    }}
                                    width="150px"
                                  />
                                );
                              }}
                            />
                          </InnerCell>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <InnerCell>
                            <Controller
                              control={control}
                              name={`${v.foodId}${el.serviceDate}count`}
                              render={({field}) => {
                                return (
                                  <Input
                                    {...field}
                                    value={field.value || ''}
                                    type="number"
                                    rules={{
                                      pattern: {
                                        value: /^[0-9]+$/,
                                      },
                                    }}
                                    onChange={e => {
                                      setExtraListData(
                                        extraListData.map(extra => {
                                          if (
                                            extra.foodId === v.foodId &&
                                            el.serviceDate === extra.serviceDate
                                          )
                                            return {
                                              ...extra,
                                              count: parseInt(e.target.value),
                                              totalPrice:
                                                e.target.value * v.price,
                                            };
                                          return extra;
                                        }),
                                      );
                                      return field.onChange(
                                        parseInt(e.target.value),
                                      );
                                    }}
                                    width="150px"
                                  />
                                );
                              }}
                            />
                          </InnerCell>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <InnerCell>
                            {(countValue ?? 0) * v.price === 0
                              ? '0'
                              : withCommas((countValue ?? 0) * v.price)}
                            원
                          </InnerCell>
                        </Table.Cell>
                      </Table.Row>
                    );
                  });
                })}
              </Table.Body>
            </Table>
          </FormProvider>
        </div>
      </TableWrapper>
    </Wrapper>
  );
};
export default AddOrder;

const Wrapper = styled.div`
  margin-top: 24px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const SelectBox = styled(Select)`
  /* width: 200px; */
  margin-top: 4px;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;
const CancelText = styled.div`
  font-weight: 600;
  color: #dd5257;
`;

const FilterWrap = styled.div`
  display: flex;
`;
