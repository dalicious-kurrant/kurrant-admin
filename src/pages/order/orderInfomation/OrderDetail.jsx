import {useLocation} from 'react-router-dom';
import {useGetOrderDetailList} from '../../../hooks/useOrderList';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from '../../../utils/withCommas';
const OrderDetail = () => {
  const location = useLocation();
  const orderCode = location.state.orderCode;

  const {data: orderDetail} = useGetOrderDetailList(orderCode);
  console.log(orderDetail?.data);
  return (
    <Wrap>
      <TableWrap>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>주문번호</Table.HeaderCell>
              <Table.HeaderCell>구매자</Table.HeaderCell>
              <Table.HeaderCell>서비스일</Table.HeaderCell>
              <Table.HeaderCell>해당 스팟 정보</Table.HeaderCell>
              <Table.HeaderCell>추가 총 결제 금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <TableRow>
              <Table.Cell>{orderDetail?.data?.orderCode}</Table.Cell>
              <Table.Cell>{orderDetail?.data?.userName}</Table.Cell>
              <Table.Cell>{orderDetail?.data?.servicePeriod}</Table.Cell>
              <Table.Cell>{orderDetail?.data?.spotName}</Table.Cell>
              <Table.Cell>
                {withCommas(orderDetail?.data?.totalPrice)}원
              </Table.Cell>
            </TableRow>
          </Table.Body>
        </Table>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>서비스일</Table.HeaderCell>
              <Table.HeaderCell>다이닝타입</Table.HeaderCell>
              <Table.HeaderCell>번호</Table.HeaderCell>
              <Table.HeaderCell>메이커스</Table.HeaderCell>
              <Table.HeaderCell>상품명</Table.HeaderCell>
              <Table.HeaderCell>할인 적용가</Table.HeaderCell>
              <Table.HeaderCell>개수</Table.HeaderCell>
              <Table.HeaderCell>주문 상태</Table.HeaderCell>
              <Table.HeaderCell>결제 총금액</Table.HeaderCell>
              <Table.HeaderCell>지원금</Table.HeaderCell>
              <Table.HeaderCell>추가 결제금액</Table.HeaderCell>
              <Table.HeaderCell>배송비</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderDetail?.data.orderItemDailyFoodGroups.map((el, index) => {
              return el.orderItemDailyFoods.map((v, idx) => {
                return (
                  <TableRow key={idx}>
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle">
                        {el.serviceDate}
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        textAlign="center"
                        verticalAlign="middle">
                        {el.diningType}
                      </Table.Cell>
                    )}
                    <Table.Cell>{idx + 1}</Table.Cell>
                    <Table.Cell>{v.makers}</Table.Cell>
                    <Table.Cell>{v.foodName}</Table.Cell>
                    <Table.Cell>{withCommas(v.discountedPrice)}</Table.Cell>
                    <Table.Cell>{v.count}</Table.Cell>
                    <Table.Cell>{v.orderStatus}</Table.Cell>
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle">
                        {withCommas(el.totalPrice) || 0}원
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle">
                        {withCommas(el.supportPrice) || 0}원
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle">
                        {withCommas(el.payPrice) || 0}원
                      </Table.Cell>
                    )}
                    {idx === 0 && (
                      <Table.Cell
                        rowSpan={el.orderItemDailyFoods.length}
                        verticalAlign="middle">
                        {withCommas(el.deliveryFee) || 0}원
                      </Table.Cell>
                    )}
                  </TableRow>
                );
              });
            })}
          </Table.Body>
        </Table>
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
  width: 80%;
  overflow: auto;
`;
const TableRow = styled(Table.Row)`
  /* :hover {
    cursor: pointer;
    background-color: whitesmoke;
  } */
`;
