import {useLocation} from 'react-router-dom';
import {useGetOrderDetailList} from '../../../hooks/useOrderList';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from '../../../utils/withCommas';
const OrderDetail = () => {
  const location = useLocation();
  const orderCode = location.state.orderCode;

  const {data: orderDetail} = useGetOrderDetailList(orderCode);

  return (
    <Wrap>
      <TableWrap>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">주문번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">구매자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">서비스일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                해당 스팟 정보
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                추가 총 결제 금액
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <TableRow>
              <Table.Cell textAlign="center">
                {orderDetail?.data?.orderCode}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {orderDetail?.data?.userName}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {orderDetail?.data?.servicePeriod}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {orderDetail?.data?.spotName}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {withCommas(orderDetail?.data?.totalPrice) || 0}원
              </Table.Cell>
            </TableRow>
          </Table.Body>
        </Table>

        <TableDetail celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">서비스일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">다이닝타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품명</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                할인 적용가
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">개수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문 상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                결제 총금액
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">지원금</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                추가 결제금액
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송비</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderDetail?.data.orderItemDailyFoodGroups.map((el, index) => {
              return el.orderItemDailyFoods.map((v, idx) => {
                // console.log(v);
                return (
                  <TableRow key={idx}>
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle"
                        textAlign="center">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {el.serviceDate}
                        </div>
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        textAlign="center"
                        verticalAlign="middle">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {el.diningType}
                        </div>
                      </Table.Cell>
                    )}
                    <Table.Cell textAlign="center">{idx + 1}</Table.Cell>
                    <Table.Cell>
                      <div style={{whiteSpace: 'nowrap'}}>{v.makers}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{whiteSpace: 'nowrap'}}>{v.foodName}</div>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <div style={{whiteSpace: 'nowrap'}}>
                        {' '}
                        {withCommas(v.discountedPrice) || 0}원{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{v.count}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <div style={{whiteSpace: 'nowrap'}}>
                        {v.orderStatus === '취소' ? (
                          <OrderCancel>{v.orderStatus}</OrderCancel>
                        ) : (
                          v.orderStatus
                        )}{' '}
                      </div>
                    </Table.Cell>
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle"
                        textAlign="right">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(el.totalPrice) || 0}원
                        </div>
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle"
                        textAlign="right">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(el.supportPrice) || 0}원
                        </div>
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle"
                        textAlign="right">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(el.payPrice) || 0}원
                        </div>
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle"
                        textAlign="right">
                        <div style={{whiteSpace: 'nowrap'}}>
                          {withCommas(el.deliveryPrice) || 0}원
                        </div>
                      </Table.Cell>
                    )}
                  </TableRow>
                );
              });
            })}
          </Table.Body>
        </TableDetail>
      </TableWrap>
    </Wrap>
  );
};

export default OrderDetail;

const Wrap = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const TableWrap = styled.div`
  width: 90%;
  overflow: auto;
`;
const TableRow = styled(Table.Row)`
  /* :hover {
    cursor: pointer;
    background-color: whitesmoke;
  } */
`;

const TableDetail = styled(Table)`
  margin-top: 50px;
`;

const OrderCancel = styled.span`
  color: ${({theme}) => theme.colors.red[500]};
`;
