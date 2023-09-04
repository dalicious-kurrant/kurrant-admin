import {useGetExtraHistory, useRefundExtraOrder} from 'hooks/useExtraOrder';
import {useGetGroupList} from 'hooks/useOrderList';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {Button, Dropdown, Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {
  extraHistoryEndDateAtom,
  extraHistoryStartDateAtom,
  extraOrderGroupOptionAtom,
} from 'utils/store';
import withCommas from 'utils/withCommas';

const History = () => {
  const [groupOption, setGroupOption] = useAtom(extraOrderGroupOptionAtom);
  const [startDate, setStartDate] = useAtom(extraHistoryStartDateAtom);
  const [endDate, setEndDate] = useAtom(extraHistoryEndDateAtom);
  const {data: extraHistoryList, refetch} = useGetExtraHistory(
    startDate,
    endDate,
    groupOption,
  );
  const {mutateAsync: refundExtraOrder} = useRefundExtraOrder();
  const {data: groupList} = useGetGroupList();

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const refundOrderPress = async id => {
    await refundExtraOrder({id: id});
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
    refetch();
  }, [startDate, endDate, refetch]);

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
              {extraHistoryList?.data?.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={10} textAlign="center">
                    추가 주문 내역이 없습니다.
                  </Table.Cell>
                </Table.Row>
              ) : (
                extraHistoryList?.data?.map((el, idx) => {
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell textAlign="center">
                        {el.serviceDate}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.createdDateTime}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{el.groupName}</Table.Cell>
                      <Table.Cell textAlign="center">{el.spotName}</Table.Cell>
                      <Table.Cell textAlign="center">{el.usage}</Table.Cell>
                      <Table.Cell textAlign="center">{el.foodName}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {withCommas(el.price)}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{el.count}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {withCommas(el.totalPrice)}
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
      </TableWrapper>
    </Wrapper>
  );
};
export default History;

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

const CancelText = styled.div`
  font-weight: 600;
  color: #dd5257;
`;
const FilterWrap = styled.div`
  display: flex;
`;
